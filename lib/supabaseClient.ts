import { createClient } from "@supabase/supabase-js";

// Hooked into the central Business Portfolio "Hive Mind" database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://trmowfarkjutzdzqesbe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybW93ZmFya2p1dHpkenFlc2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MDM3MjAsImV4cCI6MjA5OTE3OTcyMH0.yLuCUHc4Qy5O1teNuA6tuAsIzKbzvkwh0weDO31Eb1Y";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Missing Supabase env vars. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Safe for client-side
export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? ""
);
