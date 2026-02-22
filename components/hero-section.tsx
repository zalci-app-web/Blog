import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export type CategoryKey = "game_tech" | "ai_tech" | "dev_diary" | "daily_life" | "hobbies";

export interface LatestArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryKey: CategoryKey;
  image: string;
  slug: string;
}

const categoryBadgeColors: Record<CategoryKey, string> = {
  game_tech: "bg-green-500/20 text-green-400 border border-green-500/30",
  ai_tech: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  dev_diary: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
  daily_life: "bg-stone-500/20 text-stone-600 border border-stone-400/30",
  hobbies: "bg-orange-500/20 text-orange-600 border border-orange-500/30",
};

export function HeroSection({ latestArticles }: { latestArticles: LatestArticle[] }) {
  if (!latestArticles || latestArticles.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Latest Updates
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              最新の記事
            </h2>
          </div>
        </div>
        <div className="flex justify-center py-10 text-muted-foreground">
          記事がありません。
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Latest Updates
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            最新の記事
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestArticles.map((article) => (
          <Link
            key={article.id}
            href={`/${article.categoryKey}/${article.slug}`}
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <article>
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className={`absolute inset-0 ${!article.image.startsWith('/') ? 'bg-muted' : ''}`}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${categoryBadgeColors[article.categoryKey] || 'bg-gray-500/20 text-gray-400'}`}
                >
                  {article.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-3 line-clamp-2 text-pretty text-lg font-bold leading-relaxed text-card-foreground transition-colors group-hover:text-foreground">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <time>{article.date}</time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
