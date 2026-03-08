import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Parse browser & device from request body
    let browser = "unknown";
    let device = "unknown";
    try {
      const body = await req.json();
      browser = body.browser || "unknown";
      device = body.device || "unknown";
    } catch {
      // no body — defaults stand
    }

    // Geo-locate via ipapi.co
    let country = "Unknown";
    let country_code = "??";
    let city: string | null = null;

    if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { "User-Agent": "sajeeb-portfolio/1.0" },
        });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (!geo.error) {
            country = geo.country_name || "Unknown";
            country_code = geo.country_code || "??";
            city = geo.city || null;
          }
        }
      } catch {
        // Geo lookup failed, use defaults
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Upsert: ON CONFLICT (ip, browser, device) → update timestamp only
    const { error } = await supabase
      .from("visitor_logs")
      .upsert(
        { ip, browser, device, country, country_code, city, visited_at: new Date().toISOString() },
        { onConflict: "ip,browser,device", ignoreDuplicates: false }
      );

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, country, country_code, city }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
