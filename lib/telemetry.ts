export async function sendSortStoryTelemetry(data: {
  sessionId: string;
  algorithmSlug: string;
  eventType: 'started' | 'completed' | 'aborted';
  executionTimeMs?: number;
  metadata?: Record<string, any>;
}) {
  try {
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.warn('Telemetry failed:', await res.text());
    }
  } catch (err) {
    console.warn('Telemetry error:', err);
  }
}
