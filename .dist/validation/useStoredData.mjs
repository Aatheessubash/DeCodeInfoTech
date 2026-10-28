'use client';
import { useEffect, useState } from 'react';
function readStoredData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        if (!saved) return fallback;
        const parsed = JSON.parse(saved);
        if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : fallback;
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? {
            ...fallback,
            ...parsed
        } : fallback;
    } catch  {
        return fallback;
    }
}
// Pass stable defaults and a stable optional migration function.
export function useStoredData(key, fallback, normalize) {
    // The server and the first client render must use identical data.
    const [value, setValue] = useState(fallback);
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        const stored = readStoredData(key, fallback);
        setValue(normalize ? normalize(stored) : stored);
        setLoaded(true);
    }, [
        key,
        fallback,
        normalize
    ]);
    useEffect(()=>{
        // Do not overwrite saved admin content before it has been read.
        if (!loaded) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch  {
        // Keep the site working when storage is blocked or full.
        }
    }, [
        key,
        value,
        loaded
    ]);
    return [
        value,
        setValue
    ];
}
