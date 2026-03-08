import { useState, useCallback } from "react";

const STORAGE_KEY = "sajeeb_section_counts";

function loadCounts(): Record<string, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function saveCounts(counts: Record<string, number>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(counts)); } catch {}
}

// Global state shared across hook instances (simple module-level store)
let globalCounts: Record<string, number> = loadCounts();
const listeners: Set<() => void> = new Set();

function notify() { listeners.forEach(l => l()); }

export function useDynamicSection(section: string, defaultCount: number) {
  const [, forceUpdate] = useState(0);

  const subscribe = useCallback(() => {
    const handler = () => forceUpdate(n => n + 1);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  // Register listener on first render
  useState(() => { const unsub = subscribe(); return unsub; });

  const count = globalCounts[section] ?? defaultCount;

  const add = useCallback(() => {
    globalCounts = { ...globalCounts, [section]: count + 1 };
    saveCounts(globalCounts);
    notify();
  }, [section, count]);

  const remove = useCallback((index: number) => {
    const newCount = Math.max(1, count - 1);
    globalCounts = { ...globalCounts, [section]: newCount };
    saveCounts(globalCounts);
    notify();
  }, [section, count]);

  return { count, add, remove };
}
