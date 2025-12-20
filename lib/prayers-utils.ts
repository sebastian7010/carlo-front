export type PrayerApi = {
  id: string
  title: string
  content: string
  category: string | null
  approved: boolean
  createdAt: string
  updatedAt: string
}

export type PrayerFormData = {
  title: string
  content: string
  category?: string | null
  approved?: boolean
}

type PrayerPatchData = Partial<PrayerFormData>

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").trim()
}

async function jsonOrThrow(res: Response) {
  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`HTTP ${res.status} ${txt}`.trim())
  }
  return res.json()
}

export async function getPrayers(): Promise<PrayerApi[]> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/prayers`, { cache: "no-store" })
  return (await jsonOrThrow(res)) as PrayerApi[]
}

export async function getApprovedPrayers(): Promise<PrayerApi[]> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/prayers/approved`, { cache: "no-store" })
  return (await jsonOrThrow(res)) as PrayerApi[]
}

export async function createPrayer(data: PrayerFormData): Promise<PrayerApi> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/prayers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return (await jsonOrThrow(res)) as PrayerApi
}

export async function updatePrayer(id: string, data: PrayerPatchData): Promise<PrayerApi> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/prayers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return (await jsonOrThrow(res)) as PrayerApi
}

export async function deletePrayer(id: string): Promise<void> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/prayers/${id}`, { method: "DELETE" })
  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`HTTP ${res.status} ${txt}`.trim())
  }
}
