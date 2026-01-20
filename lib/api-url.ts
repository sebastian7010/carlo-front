export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  // Si no hay base (mal config), devolvemos relativo para no reventar
  if (!base) return p;
  return base.replace(/\/+$/, "") + p;
}
