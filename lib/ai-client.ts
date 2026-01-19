export async function withBackoff<T>(fn: () => Promise<T>, max = 5) {
  let delay = 500;

  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (e: any) {
      // Solo backoff si es 429
      if (e?.status !== 429) throw e;

      const jitter = Math.floor(Math.random() * 200);
      await new Promise((r) => setTimeout(r, delay + jitter));
      delay *= 2;
    }
  }

  // último intento
  return await fn();
}

// IMPORTANTE:
// - En el browser: usa rutas relativas para evitar CORS.
// - En server: igual funciona (pega al mismo dominio). Tus rewrites hacen el resto.
function rel(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function postAiChat(params: { message: string; lang?: string; sessionId?: string }) {
  return await withBackoff(async () => {
    const url = rel("/ai/chat");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        message: params.message,
        lang: params.lang || "es",
        sessionId: params.sessionId,
      }),
    });

    const data = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      const err: any = new Error(data?.detail || data?.error || res.statusText || "AI_CHAT_FAILED");
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data as { answer: string };
  });
}

export async function postAiTranslate(params: { text: string; targetLang: string }) {
  return await withBackoff(async () => {
    const url = rel("/ai/translate");

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(params),
    });

    const data = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      const err: any = new Error(data?.detail || data?.error || res.statusText || "AI_TRANSLATE_FAILED");
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data as { translated: string; cached?: boolean };
  });
}
