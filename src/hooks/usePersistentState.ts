'use client';

import { useEffect, useState } from 'react';
import { migrateCopy } from '@/data/migrate-copy';

/** Hydrate after mount so the server and first browser render match. */
export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const parsed: unknown = JSON.parse(stored);
        // Ignore malformed or incompatible data from earlier app versions.
        if (
          parsed !== null &&
          typeof parsed === typeof initialValue &&
          Array.isArray(parsed) === Array.isArray(initialValue)
        ) {
          const migrated = migrateCopy(key, parsed);
          if (migrated !== null && migrated !== undefined) {
            setValue(migrated as T);
          }
        }
      }
    } catch {
      // Storage may be unavailable or contain invalid JSON.
    }
    setLoaded(true);
  }, [key, initialValue]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep edits available in memory if browser storage is full or disabled.
    }
  }, [key, loaded, value]);

  return [value, setValue] as const;
}
