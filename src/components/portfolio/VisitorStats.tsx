import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Globe, RefreshCw, ChevronDown, ChevronUp, X, TrendingUp,
  Monitor, Smartphone, Tablet, Chrome, MapPin, Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CountryCount {
  country: string;
  country_code: string;
  count: number;
  cities: string[];
}

interface DeviceCount { label: string; count: number }
interface BrowserCount { label: string; count: number }

interface Stats {
  total: number;
  today: number;
  countries: CountryCount[];
  devices: DeviceCount[];
  browsers: BrowserCount[];
  recentVisitors: { country: string; country_code: string; city: string | null; browser: string | null; device: string | null; visited_at: string }[];
}

const FLAG_BASE = "https://flagcdn.com/16x12";

function DeviceIcon({ device }: { device: string }) {
  const d = device.toLowerCase();
  if (d === "mobile") return <Smartphone className="w-3 h-3" />;
  if (d === "tablet") return <Tablet className="w-3 h-3" />;
  return <Monitor className="w-3 h-3" />;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

type Tab = "overview" | "devices" | "recent";

export default function VisitorStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0, today: 0, countries: [], devices: [], browsers: [], recentVisitors: []
  });
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const [
        { count: total },
        { count: todayCount },
        { data: rows },
        { data: recent }
      ] = await Promise.all([
        supabase.from("visitor_logs").select("*", { count: "exact", head: true }),
        supabase.from("visitor_logs").select("*", { count: "exact", head: true })
          .gte("visited_at", (() => { const d = new Date(); d.setHours(0,0,0,0); return d.toISOString(); })()),
        supabase.from("visitor_logs").select("country, country_code, city, browser, device"),
        supabase.from("visitor_logs").select("country, country_code, city, browser, device, visited_at")
          .order("visited_at", { ascending: false }).limit(10),
      ]);

      // Countries + cities
      const countMap: Record<string, CountryCount> = {};
      const deviceMap: Record<string, number> = {};
      const browserMap: Record<string, number> = {};

      for (const row of rows ?? []) {
        const key = row.country;
        if (!countMap[key]) countMap[key] = { country: row.country, country_code: row.country_code, count: 0, cities: [] };
        countMap[key].count++;
        if (row.city && !countMap[key].cities.includes(row.city)) countMap[key].cities.push(row.city);

        const dev = row.device || "Unknown";
        deviceMap[dev] = (deviceMap[dev] || 0) + 1;

        const br = row.browser || "Unknown";
        browserMap[br] = (browserMap[br] || 0) + 1;
      }

      setStats({
        total: total ?? 0,
        today: todayCount ?? 0,
        countries: Object.values(countMap).sort((a, b) => b.count - a.count),
        devices: Object.entries(deviceMap).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
        browsers: Object.entries(browserMap).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
        recentVisitors: recent ?? [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    fetchStats();

    const channel = supabase
      .channel("visitor_logs_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "visitor_logs" }, () => fetchStats())
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "visitor_logs" }, () => fetchStats())
      .subscribe();

    const startPoll = () => { pollRef.current = setTimeout(() => { fetchStats(); startPoll(); }, 10_000); };
    startPoll();

    return () => {
      supabase.removeChannel(channel);
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [open, fetchStats]);

  const displayedCountries = expanded ? stats.countries : stats.countries.slice(0, 4);

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "devices", label: "Devices" },
    { id: "recent", label: "Recent" },
  ];

  return (
    <>
      {/* Floating trigger pill */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg"
        style={{
          background: "hsl(155 40% 14%)",
          border: "1px solid hsl(155 30% 28%)",
          color: "hsl(155 55% 72%)",
          boxShadow: "0 4px 20px hsl(155 50% 20% / 0.4)",
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.2 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(155 55% 55%)" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(155 55% 55%)" }} />
        </span>
        <Users className="w-3.5 h-3.5" />
        <span>{stats.total} visitors</span>
      </motion.button>

      {/* Stats panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-20 left-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: "hsl(155 42% 10%)",
              border: "1px solid hsl(155 30% 22%)",
              boxShadow: "0 20px 60px hsl(155 50% 8% / 0.8)",
              maxHeight: "80vh",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid hsl(155 25% 18%)" }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: "hsl(155 55% 60%)" }} />
                <span className="font-semibold text-sm" style={{ color: "hsl(155 30% 88%)" }}>Visitor Analytics</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "hsl(155 40% 18%)", color: "hsl(155 50% 60%)" }}>Live</span>
              </div>
              <div className="flex items-center gap-1">
                <motion.button onClick={fetchStats} disabled={loading} className="p-1.5 rounded-lg" style={{ color: "hsl(155 30% 55%)" }} whileTap={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </motion.button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg" style={{ color: "hsl(155 20% 50%)" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2 p-3 flex-shrink-0" style={{ borderBottom: "1px solid hsl(155 25% 16%)" }}>
              {[
                { label: "Unique Visitors", value: stats.total, icon: Users },
                { label: "Today", value: stats.today, icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl p-3 text-center" style={{ background: "hsl(155 38% 14%)", border: "1px solid hsl(155 28% 20%)" }}>
                  <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: "hsl(155 50% 55%)" }} />
                  <motion.div key={value} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.12 }} className="text-xl font-bold" style={{ color: "hsl(155 20% 92%)" }}>
                    {value}
                  </motion.div>
                  <div className="text-xs" style={{ color: "hsl(155 20% 52%)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-3 pt-3 flex-shrink-0">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="flex-1 text-xs py-1.5 rounded-lg font-medium transition-all"
                  style={tab === t.id
                    ? { background: "hsl(155 50% 22%)", color: "hsl(155 60% 78%)" }
                    : { background: "hsl(155 32% 14%)", color: "hsl(155 20% 50%)" }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="overflow-y-auto flex-1 p-3" style={{ scrollbarWidth: "none" }}>
              <AnimatePresence mode="wait">

                {/* OVERVIEW TAB */}
                {tab === "overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Globe className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(155 30% 55%)" }}>
                        Countries ({stats.countries.length})
                      </span>
                    </div>
                    {stats.countries.length === 0 ? (
                      <p className="text-xs text-center py-3" style={{ color: "hsl(155 15% 45%)" }}>No visits yet</p>
                    ) : (
                      <div className="space-y-2">
                        {displayedCountries.map((c, i) => {
                          const pct = stats.total > 0 ? Math.round((c.count / stats.total) * 100) : 0;
                          return (
                            <motion.div key={c.country} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02, duration: 0.12 }}>
                              <div className="flex items-center gap-2 mb-0.5">
                                <img
                                  src={`${FLAG_BASE}/${c.country_code.toLowerCase()}.png`}
                                  alt={c.country}
                                  className="w-4 h-3 rounded-sm object-cover flex-shrink-0"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                                <span className="text-xs flex-1 truncate font-medium" style={{ color: "hsl(155 15% 78%)" }}>{c.country}</span>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <div className="w-14 h-1 rounded-full overflow-hidden" style={{ background: "hsl(155 28% 20%)" }}>
                                    <motion.div className="h-full rounded-full" style={{ background: "hsl(155 50% 45%)" }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3, delay: i * 0.02 }} />
                                  </div>
                                  <span className="text-xs w-5 text-right" style={{ color: "hsl(155 20% 55%)" }}>{c.count}</span>
                                </div>
                              </div>
                              {c.cities.length > 0 && (
                                <div className="ml-6 flex flex-wrap gap-1">
                                  {c.cities.slice(0, 3).map(city => (
                                    <span key={city} className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "hsl(155 30% 16%)", color: "hsl(155 25% 55%)" }}>
                                      <MapPin className="w-2 h-2 inline mr-0.5" />{city}
                                    </span>
                                  ))}
                                  {c.cities.length > 3 && <span className="text-[10px]" style={{ color: "hsl(155 20% 42%)" }}>+{c.cities.length - 3}</span>}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                    {stats.countries.length > 4 && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg"
                        style={{ color: "hsl(155 40% 52%)", background: "hsl(155 32% 13%)" }}
                      >
                        {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> All {stats.countries.length} countries</>}
                      </button>
                    )}
                  </motion.div>
                )}

                {/* DEVICES TAB */}
                {tab === "devices" && (
                  <motion.div key="devices" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }} className="space-y-4">
                    {/* Devices */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Monitor className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(155 30% 55%)" }}>Devices</span>
                      </div>
                      <div className="space-y-1.5">
                        {stats.devices.map((d, i) => {
                          const pct = stats.total > 0 ? Math.round((d.count / stats.total) * 100) : 0;
                          return (
                            <div key={d.label} className="flex items-center gap-2">
                              <span style={{ color: "hsl(155 45% 55%)" }}><DeviceIcon device={d.label} /></span>
                              <span className="text-xs w-16 truncate" style={{ color: "hsl(155 15% 72%)" }}>{d.label}</span>
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(155 28% 20%)" }}>
                                <motion.div className="h-full rounded-full" style={{ background: "hsl(155 50% 45%)" }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3, delay: i * 0.05 }} />
                              </div>
                              <span className="text-xs w-8 text-right" style={{ color: "hsl(155 20% 55%)" }}>{d.count} <span style={{ color: "hsl(155 20% 40%)" }}>({pct}%)</span></span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Browsers */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Chrome className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(155 30% 55%)" }}>Browsers</span>
                      </div>
                      <div className="space-y-1.5">
                        {stats.browsers.map((b, i) => {
                          const pct = stats.total > 0 ? Math.round((b.count / stats.total) * 100) : 0;
                          return (
                            <div key={b.label} className="flex items-center gap-2">
                              <span className="text-xs w-16 truncate" style={{ color: "hsl(155 15% 72%)" }}>{b.label}</span>
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(155 28% 20%)" }}>
                                <motion.div className="h-full rounded-full" style={{ background: "hsl(200 50% 45%)" }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3, delay: i * 0.05 }} />
                              </div>
                              <span className="text-xs w-8 text-right" style={{ color: "hsl(155 20% 55%)" }}>{b.count} <span style={{ color: "hsl(155 20% 40%)" }}>({pct}%)</span></span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* RECENT TAB */}
                {tab === "recent" && (
                  <motion.div key="recent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(155 30% 55%)" }}>Recent Visitors</span>
                    </div>
                    {stats.recentVisitors.length === 0 ? (
                      <p className="text-xs text-center py-3" style={{ color: "hsl(155 15% 45%)" }}>No visits yet</p>
                    ) : (
                      <div className="space-y-1.5">
                        {stats.recentVisitors.map((v, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02, duration: 0.12 }}
                            className="flex items-center gap-2 rounded-lg p-2"
                            style={{ background: "hsl(155 35% 13%)" }}
                          >
                            <img
                              src={`${FLAG_BASE}/${v.country_code.toLowerCase()}.png`}
                              alt={v.country}
                              className="w-4 h-3 rounded-sm object-cover flex-shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium truncate" style={{ color: "hsl(155 15% 78%)" }}>
                                {v.city ? `${v.city}, ` : ""}{v.country}
                              </div>
                              <div className="text-[10px] flex items-center gap-1.5" style={{ color: "hsl(155 20% 48%)" }}>
                                {v.device && <span style={{ color: "hsl(155 40% 52%)" }}><DeviceIcon device={v.device} /></span>}
                                <span>{v.browser || "Unknown"}</span>
                                <span>·</span>
                                <span>{v.device || "Unknown"}</span>
                              </div>
                            </div>
                            <span className="text-[10px] flex-shrink-0" style={{ color: "hsl(155 20% 42%)" }}>
                              {timeAgo(v.visited_at)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
