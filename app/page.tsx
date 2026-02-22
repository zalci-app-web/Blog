import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { CategoryPortals } from "@/components/category-portals";
import { createClient } from "@/utils/supabase/server";
import { CategoryKey, LatestArticle } from "@/components/hero-section";
import { CategoryData } from "@/components/category-portals";

const categoryMap: Record<string, 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies'> = {
  "game-tech": "game_tech",
  "ai-tech": "ai_tech",
  "dev-diary": "dev_diary",
  "daily": "daily_life",
  "hobbies": "hobbies",
};

export const revalidate = 60; // optionally cache for 60s

export default async function Home() {
  const supabase = await createClient();

  // Fetch latest 3 articles
  const latestArticlesPromise = supabase
    .from('posts')
    .select('id, title, created_at, category, thumbnail_url, slug')
    .order('created_at', { ascending: false })
    .limit(3);

  // Fetch data for categories
  const categoryPromises = Object.entries(categoryMap).map(async ([id, enumValue]) => {
    // Get latest article for the category
    const { data: latest } = await supabase
      .from('posts')
      .select('title')
      .eq('category', enumValue)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Get count for the category
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category', enumValue);

    return {
      id,
      articleCount: count || 0,
      latestArticle: latest?.title || "まだ記事がありません",
    } as CategoryData;
  });

  const [latestData, ...categoryResults] = await Promise.all([
    latestArticlesPromise,
    ...categoryPromises
  ]);

  const latestArticles: LatestArticle[] = (latestData.data || []).map((post) => {
    const defaultImages: Record<string, string> = {
      game_tech: "/images/hero-game.jpg",
      ai_tech: "/images/hero-ai.jpg",
      dev_diary: "/images/hero-diary.jpg",
      daily_life: "/images/hero-diary.jpg", // placeholder if none
      hobbies: "/images/hero-diary.jpg",
    };

    // Map enum back to display name
    const displayNames: Record<string, string> = {
      game_tech: "ゲーム技術",
      ai_tech: "AI技術",
      dev_diary: "制作日記",
      daily_life: "日常まとめ",
      hobbies: "趣味・エンタメ",
    };

    return {
      id: post.id,
      title: post.title,
      date: new Date(post.created_at).toLocaleDateString('ja-JP').replace(/\//g, '.'),
      category: displayNames[post.category] || post.category,
      categoryKey: post.category as any,
      image: post.thumbnail_url || defaultImages[post.category] || "/images/hero-game.jpg",
      slug: post.slug,
    };
  });

  const categoryData = categoryResults.reduce((acc: Record<string, CategoryData>, curr: CategoryData) => {
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, CategoryData>);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portal Hub',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    description: 'ゲーム技術、AI、制作日記、日常、趣味エンタメの最新情報をまとめたポータルサイト',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Portal Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/icon.svg`
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection latestArticles={latestArticles} />
        <CategoryPortals categoryData={categoryData} />
      </main>
      <SiteFooter />
    </div>
  );
}
