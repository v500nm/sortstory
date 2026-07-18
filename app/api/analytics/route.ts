import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient"; // From root/lib

/**
 * SortStory Analytics API
 * Ingests telemetry data from the SortStory frontend.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, algorithmSlug, eventType, executionTimeMs, metadata } = body;

    if (!sessionId || !algorithmSlug || !eventType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (sessionId, algorithmSlug, eventType)" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('sortstory_analytics')
      .insert([{
        session_id: sessionId,
        algorithm_slug: algorithmSlug,
        event_type: eventType,
        execution_time_ms: executionTimeMs || null,
        metadata: metadata || {}
      }]);

    if (error) {
      console.error("[SortStory Analytics] DB Insert Error:", error);
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[SortStory Analytics] Unhandled Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
