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

    if (eventType === 'completed') {
      const nodeId = `sortstory-${algorithmSlug}`;
      
      // Check if node exists
      const { data: existingNode } = await supabase
        .from('hive_mind_nodes')
        .select('*')
        .eq('id', nodeId)
        .single();

      if (existingNode) {
        let newSize = existingNode.size + 0.05;
        if (newSize > 2.5) newSize = 2.5;
        await supabase
          .from('hive_mind_nodes')
          .update({ size: newSize, updated_at: new Date().toISOString() })
          .eq('id', nodeId);
      } else {
        await supabase.from('hive_mind_nodes').insert([{
          id: nodeId,
          label: `${algorithmSlug.charAt(0).toUpperCase() + algorithmSlug.slice(1)} Sort`,
          description: `Analytics learned from SortStory execution.`,
          color: '#bc00ff',
          size: 0.35,
          project_source: 'sortstory',
          connections: ['core-sortstory']
        }]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[SortStory Analytics] Unhandled Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
