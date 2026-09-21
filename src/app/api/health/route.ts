// Liveness is independent of external SMTP availability.
export async function GET() {
  return Response.json({ status: 'ok' });
}
