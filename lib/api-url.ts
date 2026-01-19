import { getSiteUrl } from "@/lib/site-url";

export function apiUrl(path: string) {
  // Asegura que path empiece con /
  const p = path.startsWith("/") ? path : `/${path}`;

  // En el browser: usa rutas relativas (evita CORS)
  if (typeof window !== "undefined") return p;

  // En server components: usa URL absoluta al mismo sitio (Vercel)
  return getSiteUrl() + p;
}
