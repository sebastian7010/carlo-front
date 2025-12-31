export async function withBackoff<T>(fn: () => Promise<T>, max = 5) {
  let delay = 500;
  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (e: any) {
      // Backoff solo para rate limit
      if (e?.status !== 429) throw e;
      const jitter = Math.floor(Math.random() * 200);
      await new Promise((r) => setTimeout(r, delay + jitter));
      delay *= 2;
    }
  }
  return await fn(); // último intento
}

export async function postAiChat(params: { message: string; lang?: string; sessionId?: string }) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  return await withBackoff(async () => {
    const res = await fetch(`${base}/ai/chat`, {
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
