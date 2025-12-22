import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrayersIntroduction } from "@/components/prayers-introduction";
import { PrayersSearch } from "@/components/prayers-search";
import { PrayersCategories } from "@/components/prayers-categories";
import { FeaturedPrayers } from "@/components/featured-prayers";
import { PrayersResults } from "@/components/prayers-results";
import { ScrollToResults } from "@/components/scroll-to-results";
import { getApprovedPrayers } from "@/lib/prayers-utils";

export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export default async function OracionesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const approvedPrayers = await getApprovedPrayers();

  const qRaw = (searchParams?.q ?? searchParams?.query ?? "") as string;
  const santoRaw = (searchParams?.santo ?? searchParams?.saint ?? "") as string;
  const ocasionRaw = (searchParams?.ocasion ?? searchParams?.occasion ?? "") as string;
  const categoriaRaw = (searchParams?.categoria ?? searchParams?.category ?? "") as string;

  const q = (qRaw || "").toString().trim();
  const santo = (santoRaw || "").toString().trim();
  const ocasion = (ocasionRaw || "").toString().trim();
  const categoria = (categoriaRaw || "").toString().trim();

  const categories = Array.from(
    new Set(approvedPrayers.map((p: any) => p.category).filter(Boolean))
  ) as string[];

  const saints = Array.from(
    new Set(approvedPrayers.map((p: any) => p.saintName).filter(Boolean))
  ) as string[];

  const occasions = Array.from(
    new Set(approvedPrayers.map((p: any) => p.occasion).filter(Boolean))
  ) as string[];

  let filtered = approvedPrayers as any[];

  if (q) {
    const qq = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        (p.title ?? "").toLowerCase().includes(qq) ||
        (p.content ?? "").toLowerCase().includes(qq)
    );
  }

  if (santo) {
    const s = slugify(santo);
    filtered = filtered.filter((p) => slugify(p.saintName ?? "") === s);
  }

  if (ocasion) {
    const o = slugify(ocasion);
    filtered = filtered.filter((p) => slugify(p.occasion ?? "") === o);
  }

  if (categoria) {
    const c = slugify(categoria);
    filtered = filtered.filter((p) => slugify(p.category ?? "") === c);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <PrayersIntroduction />

        <PrayersSearch
          saints={saints}
          occasions={occasions}
          initialQuery={q}
          initialSaint={santo}
          initialOccasion={ocasion}
        />

        <PrayersCategories />

        <ScrollToResults />

        <FeaturedPrayers prayers={filtered} />

        <div id="resultados">
          <PrayersResults prayers={filtered} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
