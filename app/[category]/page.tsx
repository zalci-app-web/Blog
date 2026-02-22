import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Clock, Home, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

// Define the valid categories again for validation
const categoryMap: Record<string, { enum: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies', title: string, color: string, description: string }> = {
    "game_tech": { enum: "game_tech", title: "ゲーム技術", color: "text-green-400 bg-green-500/20 border-green-500/30", description: "グラフィックス最適化、物理エンジン、ネットコードなどゲーム開発の技術トピック" },
    "ai_tech": { enum: "ai_tech", title: "AI技術", color: "text-blue-400 bg-blue-500/20 border-blue-500/30", description: "大規模言語モデル、画像生成AI、プロンプト設計の最新動向と実践" },
    "dev_diary": { enum: "dev_diary", title: "制作中ゲーム日記", color: "text-slate-300 bg-slate-500/20 border-slate-500/30", description: "個人開発ゲームの進捗、技術的な試行錯誤、設計判断の記録" },
    "daily_life": { enum: "daily_life", title: "日常まとめ", color: "text-stone-600 bg-stone-500/20 border-stone-400/30", description: "日々の気づき、読書メモ、生活の中で見つけた小さな発見" },
    "hobbies": { enum: "hobbies", title: "趣味・エンタメ", color: "text-orange-600 bg-orange-500/20 border-orange-500/30", description: "映画、音楽、ゲームプレイ日記、お気に入りのコンテンツ紹介" },
};

export const revalidate = 60; // optionally cache for 60s

type Props = {
    params: { category: string }
}

import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category } = params;

    if (!categoryMap[category]) return {};

    const info = categoryMap[category];

    return {
        title: `${info.title} 記事一覧`,
        description: info.description,
        openGraph: {
            title: `${info.title} 記事一覧 | Portal Hub`,
            description: info.description,
            url: `/${category}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${info.title} 記事一覧 | Portal Hub`,
            description: info.description,
        },
    }
}

export default async function CategoryPage({ params }: Props) {
    const { category } = params;

    if (!categoryMap[category]) {
        notFound();
    }

    const categoryInfo = categoryMap[category];
    const supabase = await createClient();

    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, created_at, thumbnail_url, slug')
        .eq('category', categoryInfo.enum)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase Error:", error);
    }

    const displayPosts = (posts || []).map((post) => {
        const defaultImages: Record<string, string> = {
            game_tech: "/images/hero-game.png",
            ai_tech: "/images/hero-ai.png",
            dev_diary: "/images/hero-diary.png",
            daily_life: "/images/hero-daily.png",
            hobbies: "/images/hero-hobbies.png",
        };

        return {
            id: post.id,
            title: post.title,
            date: new Date(post.created_at).toLocaleDateString('ja-JP').replace(/\//g, '.'),
            image: post.thumbnail_url || defaultImages[categoryInfo.enum] || "/images/hero-game.png",
            slug: post.slug,
        };
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryInfo.title} カテゴリの記事一覧`,
        description: categoryInfo.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${category}`,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Portal Hub',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SiteHeader />

            <main className="flex-1 pb-20">
                {/* Breadcrumb Header */}
                <div className="border-b border-border/40 bg-card/50 px-4 py-8 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-foreground transition-colors flex items-center">
                                <Home className="mr-1 h-3.5 w-3.5" />
                                Home
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground">{categoryInfo.title}</span>
                        </nav>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                            {categoryInfo.title}
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {displayPosts.length} 件の記事
                        </p>
                    </div>
                </div>

                {/* Post List */}
                <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
                    {displayPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <p>記事がまだ投稿されていません。</p>
                            <Link href="/" className="mt-4 text-primary hover:underline">
                                トップページへ戻る
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {displayPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/${category}/${post.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <div className={`absolute inset-0 ${!post.image.startsWith('/') ? 'bg-muted' : ''}`}>
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-medium border ${categoryInfo.color}`}>
                                            {categoryInfo.title}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <h2 className="line-clamp-2 text-balance font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            <time>{post.date}</time>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
