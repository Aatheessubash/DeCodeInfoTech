const ALLOWED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'decodeinfotech.in',
  'www.decodeinfotech.in',
  'example.com',
]);

/**
 * Extracts a normalized client IP address from proxy headers.
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first && /^[a-fA-F0-9:.]+$/.test(first)) {
      return first;
    }
  }

  const realIp = request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip');
  if (realIp && /^[a-fA-F0-9:.]+$/.test(realIp.trim())) {
    return realIp.trim();
  }

  return '127.0.0.1';
}

/**
 * Validates request origin to protect state-changing POST routes from CSRF attacks.
 * @param {Request} request
 * @returns {boolean}
 */
export function verifySameOrigin(request) {
  // 1. Sec-Fetch-Site browser metadata check
  const secFetchSite = request.headers.get('sec-fetch-site');
  if (secFetchSite === 'cross-site') {
    return false;
  }

  // 2. Origin header check
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const originHost = originUrl.hostname.toLowerCase();

      // Check request URL host
      let reqHost = '';
      try {
        reqHost = new URL(request.url).hostname.toLowerCase();
      } catch {
        // Fallback
      }

      if (originHost === reqHost) {
        return true;
      }

      const hostHeader = request.headers.get('host')?.split(':')[0]?.toLowerCase();
      if (hostHeader && originHost === hostHeader) {
        return true;
      }

      return (
        ALLOWED_HOSTS.has(originHost) ||
        originHost.endsWith('.decodeinfotech.in') ||
        originHost.endsWith('.vercel.app')
      );
    } catch {
      return false;
    }
  }

  return true;
}

/**
 * Validates Content-Length header against maximum allowed payload size.
 * @param {Request} request
 * @param {number} maxBytes
 * @returns {boolean}
 */
export function checkPayloadSize(request, maxBytes) {
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!Number.isNaN(size) && size > maxBytes) {
      return false;
    }
  }
  return true;
}

/**
 * Removes dangerous CRLF carriage returns and newlines to prevent header injection.
 * @param {string} value
 * @returns {string}
 */
export function stripCrlf(value) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

