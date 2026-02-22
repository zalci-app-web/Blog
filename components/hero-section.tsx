import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

type CategoryKey = "game" | "ai" | "diary" | "daily" | "hobby";

interface LatestArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  categoryKey: CategoryKey;
  image: string;
}

const categoryBadgeColors: Record<CategoryKey, string> = {
  game: "bg-green-500/20 text-green-400 border border-green-500/30",
  ai: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  diary: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  daily: "bg-stone-500/20 text-stone-600 border border-stone-400/30",
  hobby: "bg-orange-500/20 text-orange-600 border border-orange-500/30",
};

const latestArticles: LatestArticle[] = [
  {
    id: 1,
    title: "Unreal Engine 6 のレイトレーシング最適化テクニック",
    date: "2026.02.20",
    category: "ゲーム技術",
    categoryKey: "game",
    image: "/images/hero-game.jpg",
  },
  {
    id: 2,
    title: "GPT-5時代のプロンプトエンジニアリング実践ガイド",
    date: "2026.02.18",
    category: "AI技術",
    categoryKey: "ai",
    image: "/images/hero-ai.jpg",
  },
  {
    id: 3,
    title: "個人開発RPGの戦闘システムをゼロから設計した話",
    date: "2026.02.15",
    category: "制作日記",
    categoryKey: "diary",
    image: "/images/hero-diary.jpg",
  },
];

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Latest Updates
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            最新の記事
          </h1>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          すべて見る
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestArticles.map((article) => (
          <article
            key={article.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${categoryBadgeColors[article.categoryKey]}`}
              >
                {article.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="mb-3 line-clamp-2 text-pretty text-lg font-bold leading-relaxed text-card-foreground transition-colors group-hover:text-foreground">
                {article.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <time>{article.date}</time>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <a
          href="#"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          すべての記事を見る
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
