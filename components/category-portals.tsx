import {
  Gamepad2,
  Brain,
  Code2,
  Coffee,
  Sparkles,
  ArrowRight,
  Terminal,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CategoryPortal {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: LucideIcon;
  articleCount: number;
  latestArticle: string;
}

const categories: CategoryPortal[] = [
  {
    id: "game-tech",
    title: "ゲーム技術",
    titleEn: "Game Tech",
    description:
      "グラフィックス最適化、物理エンジン、ネットコードなどゲーム開発の技術トピック",
    icon: Gamepad2,
    articleCount: 42,
    latestArticle: "UE6 レイトレーシング最適化",
  },
  {
    id: "ai-tech",
    title: "AI技術",
    titleEn: "AI Tech",
    description:
      "大規模言語モデル、画像生成AI、プロンプト設計の最新動向と実践",
    icon: Brain,
    articleCount: 38,
    latestArticle: "GPT-5 プロンプト実践ガイド",
  },
  {
    id: "dev-diary",
    title: "制作中ゲーム日記",
    titleEn: "Dev Diary",
    description:
      "個人開発ゲームの進捗、技術的な試行錯誤、設計判断の記録",
    icon: Code2,
    articleCount: 56,
    latestArticle: "RPG戦闘システムの設計",
  },
  {
    id: "daily",
    title: "日常まとめ",
    titleEn: "Daily Life",
    description:
      "日々の気づき、読書メモ、生活の中で見つけた小さな発見",
    icon: Coffee,
    articleCount: 29,
    latestArticle: "冬の京都で出会った一冊",
  },
  {
    id: "hobbies",
    title: "趣味・エンタメ",
    titleEn: "Hobbies & Ent",
    description:
      "映画、音楽、ゲームプレイ日記、お気に入りのコンテンツ紹介",
    icon: Sparkles,
    articleCount: 34,
    latestArticle: "2026年注目のインディーゲーム",
  },
];

function GameTechCard({ data }: { data: CategoryPortal }) {
  const Icon = data.icon;
  return (
    <a
      href={`#${data.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-green-500/20 bg-zinc-900 p-6 font-mono shadow-[0_0_15px_rgba(34,197,94,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-500/5 blur-2xl transition-all duration-500 group-hover:bg-green-500/10" />
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/10">
            <Icon className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-400">{data.title}</h3>
            <p className="text-xs text-zinc-500">{data.titleEn}</p>
          </div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          {data.description}
        </p>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-3 py-2">
          <Terminal className="h-3.5 w-3.5 text-green-500/60" />
          <span className="truncate text-xs text-zinc-500">
            {">"} {data.latestArticle}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-600">
            {data.articleCount} articles
          </span>
          <span className="flex items-center gap-1 text-xs text-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Enter
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function AiTechCard({ data }: { data: CategoryPortal }) {
  const Icon = data.icon;
  return (
    <a
      href={`#${data.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-transparent bg-white/80 p-6 font-sans tracking-tight shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1px solid transparent",
      }}
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl transition-all duration-500 group-hover:from-blue-400/20 group-hover:to-purple-400/20" />
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900">{data.title}</h3>
            <p className="text-xs text-zinc-400">{data.titleEn}</p>
          </div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600">
          {data.description}
        </p>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2">
          <span className="truncate text-xs text-zinc-500">
            {data.latestArticle}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {data.articleCount} articles
          </span>
          <span className="flex items-center gap-1 text-xs text-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View all
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function DevDiaryCard({ data }: { data: CategoryPortal }) {
  const Icon = data.icon;
  return (
    <a
      href={`#${data.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/50 bg-slate-700/50">
            <Icon className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{data.title}</h3>
            <p className="text-xs text-slate-500">{data.titleEn}</p>
          </div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          {data.description}
        </p>
      </div>
      <div>
        <div className="mb-4 overflow-hidden rounded-md border border-slate-700/50 bg-slate-900/60 font-mono text-xs">
          <div className="flex items-center gap-2 border-b border-slate-700/40 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
            <span className="h-2 w-2 rounded-full bg-green-400/80" />
            <span className="ml-2 text-slate-600">diary.md</span>
          </div>
          <div className="flex px-3 py-2">
            <span className="mr-3 select-none text-slate-600">1</span>
            <span className="truncate text-slate-400">
              # {data.latestArticle}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {data.articleCount} entries
          </span>
          <span className="flex items-center gap-1 text-xs text-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Open
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function DailyLifeCard({ data }: { data: CategoryPortal }) {
  const Icon = data.icon;
  return (
    <a
      href={`#${data.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50 p-6 font-serif shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300/60 bg-stone-100">
            <Icon className="h-5 w-5 text-stone-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-800">{data.title}</h3>
            <p className="font-sans text-xs text-stone-400">{data.titleEn}</p>
          </div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-stone-600">
          {data.description}
        </p>
      </div>
      <div>
        <div className="mb-4 border-l-2 border-stone-300 pl-3">
          <p className="text-xs italic text-stone-500">
            {data.latestArticle}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs text-stone-400">
            {data.articleCount} posts
          </span>
          <span className="flex items-center gap-1 font-sans text-xs text-stone-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Read
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function HobbiesCard({ data }: { data: CategoryPortal }) {
  const Icon = data.icon;
  return (
    <a
      href={`#${data.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:shadow-lg"
    >
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-orange-400/10 blur-2xl transition-all duration-500 group-hover:bg-orange-400/20" />
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400 shadow-md shadow-orange-400/20">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-zinc-900">{data.title}</h3>
            <p className="text-xs font-medium text-orange-400">
              {data.titleEn}
            </p>
          </div>
        </div>
        <p className="mb-4 text-sm font-medium leading-relaxed text-zinc-600">
          {data.description}
        </p>
      </div>
      <div>
        <div className="mb-4 rounded-lg bg-orange-100/80 px-3 py-2">
          <span className="truncate text-xs font-bold text-orange-700">
            {data.latestArticle}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400">
            {data.articleCount} articles
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Go!
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

const cardComponents: Record<
  string,
  React.ComponentType<{ data: CategoryPortal }>
> = {
  "game-tech": GameTechCard,
  "ai-tech": AiTechCard,
  "dev-diary": DevDiaryCard,
  daily: DailyLifeCard,
  hobbies: HobbiesCard,
};

export function CategoryPortals() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Category Portals
        </p>
        <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          カテゴリから探す
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 3).map((cat) => {
          const CardComponent = cardComponents[cat.id];
          return CardComponent ? (
            <CardComponent key={cat.id} data={cat} />
          ) : null;
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {categories.slice(3).map((cat) => {
          const CardComponent = cardComponents[cat.id];
          return CardComponent ? (
            <CardComponent key={cat.id} data={cat} />
          ) : null;
        })}
      </div>
    </section>
  );
}
