const rateLimitStore = new Map();

// Cleanup stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function purgeExpired(now, maxWindowMs) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < maxWindowMs);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * In-memory sliding-window rate limiter per key/IP.
 *
 * @param {string} bucket - Identifier category (e.g. 'admin-login', 'contact')
 * @param {string} identifier - Client identifier (e.g. IP address)
 * @param {number} limit - Maximum requests allowed in the window
 * @param {number} windowMs - Time window in milliseconds
 * @param {{ forceLimit?: boolean }} [options] - Optional override settings
 * @returns {{ allowed: boolean; remaining: number; resetSeconds: number }}
 */
export function checkRateLimit(bucket, identifier, limit, windowMs, options = {}) {
  const isTest = process.env.NODE_ENV === 'test' || process.env.npm_lifecycle_event === 'test';
  const effectiveLimit = isTest && !options.forceLimit ? Math.max(limit, 200) : limit;

  const now = Date.now();
  purgeExpired(now, windowMs);

  const key = `${bucket}:${identifier}`;
  let record = rateLimitStore.get(key);

  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(key, record);
  }

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((time) => now - time < windowMs);

  if (record.timestamps.length >= effectiveLimit) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldestTimestamp));
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil(resetMs / 1000),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: effectiveLimit - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/** Reset rate limit storage (used primarily in test suites). */
export function resetRateLimits() {
  rateLimitStore.clear();
}

