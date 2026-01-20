export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_API_URL || "";

  // En SERVER (Node): una URL relativa revienta. Mejor fallar rápido con mensaje claro.
  if (!base) {
    if (typeof window === "undefined") {
      throw new Error("NEXT_PUBLIC_API_URL is missing in server runtime. Set it in Vercel env vars.");
    }
    // En CLIENT podrías permitir relativo, pero idealmente también configuras base.
    return p;
  }

  return base.replace(/\/+$/, "") + p;
}
