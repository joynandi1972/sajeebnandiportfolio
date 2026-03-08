import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Globe, RefreshCw, ChevronDown, ChevronUp, X, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CountryCount {
  country: string;
  country_code: string;
  count: number;
}

interface Stats {
  total: number;
  today: number;
  countries: CountryCount[];
}

const FLAG_BASE = "https://flagcdn.com/16x12";

export default function VisitorStats() {
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, countries: [] });
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const { count: total } = await supabase
        .from("visitor_logs")
        .select("*", { count: "exact", head: true });

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from("visitor_logs")
        .select("*", { count: "exact", head: true })
        .gte("visited_at", todayStart.toISOString());

      const { data: rows } = await supabase
        .from("visitor_logs")
        .select("country, country_code");

      const countMap: Record<string, CountryCount> = {};
      for (const row of rows ?? []) {
        const key = row.country;
        if (!countMap[key]) {
          countMap[key] = { country: row.country, country_code: row.country_code, count: 0 };
        }
        countMap[key].count++;
      }

      setStats({
        total: total ?? 0,
        today: todayCount ?? 0,
        countries: Object.values(countMap).sort((a, b) => b.count - a.count),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Realtime subscription + polling fallback (every 10 s)
  useEffect(() => {
    if (!open) return;

    fetchStats();

    const channel = supabase
      .channel("visitor_logs_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "visitor_logs" }, () => {
        fetchStats();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "visitor_logs" }, () => {
        fetchStats();
      })
      .subscribe();

    const startPoll = () => {
      pollRef.current = setTimeout(() => {
        fetchStats();
        startPoll();
      }, 10_000);
    };
    startPoll();

    return () => {
      supabase.removeChannel(channel);
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [open, fetchStats]);

  const displayedCountries = expanded ? stats.countries : stats.countries.slice(0, 5);

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
        transition={{ delay: 0.3, duration: 0.25 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "hsl(155 55% 55%)" }} />
          <span className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "hsl(155 55% 55%)" }} />
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
            transition={{ type: "spring", stiffness: 380, damping: 28, duration: 0.2 }}
            className="fixed bottom-20 left-6 z-50 w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "hsl(155 42% 10%)",
              border: "1px solid hsl(155 30% 22%)",
              boxShadow: "0 20px 60px hsl(155 50% 8% / 0.8)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid hsl(155 25% 18%)" }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: "hsl(155 55% 60%)" }} />
                <span className="font-semibold text-sm" style={{ color: "hsl(155 30% 88%)" }}>
                  Visitor Analytics
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: "hsl(155 40% 18%)", color: "hsl(155 50% 60%)" }}>
                  Live
                </span>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={fetchStats}
                  disabled={loading}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: "hsl(155 30% 55%)" }}
                  whileTap={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </motion.button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg transition-colors hover:text-white"
                  style={{ color: "hsl(155 20% 50%)" }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2 p-3"
              style={{ borderBottom: "1px solid hsl(155 25% 16%)" }}>
              {[
                { label: "Unique Visitors", value: stats.total, icon: Users },
                { label: "Today", value: stats.today, icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl p-3 text-center"
                  style={{ background: "hsl(155 38% 14%)", border: "1px solid hsl(155 28% 20%)" }}>
                  <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: "hsl(155 50% 55%)" }} />
                  <motion.div
                    key={value}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="text-xl font-bold"
                    style={{ color: "hsl(155 20% 92%)" }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-xs" style={{ color: "hsl(155 20% 52%)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Country breakdown */}
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Globe className="w-3.5 h-3.5" style={{ color: "hsl(155 40% 52%)" }} />
                <span className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "hsl(155 30% 55%)" }}>
                  Countries ({stats.countries.length})
                </span>
              </div>

              {stats.countries.length === 0 ? (
                <p className="text-xs text-center py-3" style={{ color: "hsl(155 15% 45%)" }}>
                  No visits yet
                </p>
              ) : (
                <div className="space-y-1.5">
                  {displayedCountries.map((c, i) => {
                    const pct = stats.total > 0 ? Math.round((c.count / stats.total) * 100) : 0;
                    return (
                      <motion.div
                        key={c.country}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02, duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={`${FLAG_BASE}/${c.country_code.toLowerCase()}.png`}
                          alt={c.country}
                          className="w-4 h-3 rounded-sm object-cover flex-shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <span className="text-xs flex-1 truncate" style={{ color: "hsl(155 15% 72%)" }}>
                          {c.country}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <div className="w-12 h-1 rounded-full overflow-hidden"
                            style={{ background: "hsl(155 28% 20%)" }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: "hsl(155 50% 45%)" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.3, delay: i * 0.02 }}
                            />
                          </div>
                          <span className="text-xs w-6 text-right" style={{ color: "hsl(155 20% 58%)" }}>
                            {c.count}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {stats.countries.length > 5 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg transition-colors"
                  style={{ color: "hsl(155 40% 52%)", background: "hsl(155 32% 13%)" }}
                >
                  {expanded
                    ? <><ChevronUp className="w-3 h-3" /> Show less</>
                    : <><ChevronDown className="w-3 h-3" /> Show all {stats.countries.length} countries</>}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
