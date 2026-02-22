import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Clock, Home, ChevronRight, CalendarDays, Share2, Twitter, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const categoryMap: Record<string, { enum: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies', title: string, color: string, keywords: string[] }> = {
    "game_tech": { enum: "game_tech", title: "ゲーム技術", color: "text-green-400 bg-green-500/20 border-green-500/30", keywords: ['ゲーム開発', 'ゲームプログラミング', '最適化', 'ゲームエンジン'] },
    "ai_tech": { enum: "ai_tech", title: "AI技術", color: "text-blue-400 bg-blue-500/20 border-blue-500/30", keywords: ['AI技術', '大規模言語モデル', '画像生成AI', 'プロンプトエンジニアリング', 'LLM'] },
    "dev_diary": { enum: "dev_diary", title: "制作中ゲーム日記", color: "text-slate-300 bg-slate-500/20 border-slate-500/30", keywords: ['個人開発', 'インディーゲーム', '開発日記', '自作ゲーム'] },
    "daily_life": { enum: "daily_life", title: "日常まとめ", color: "text-stone-600 bg-stone-500/20 border-stone-400/30", keywords: ['日常', 'ライフスタイル', '読書記録', 'エンジニアの日常'] },
    "hobbies": { enum: "hobbies", title: "趣味・エンタメ", color: "text-orange-600 bg-orange-500/20 border-orange-500/30", keywords: ['エンタメ', '趣味', 'ゲームレビュー'] },
};

export const revalidate = 60;

type Props = {
    params: Promise<{ category: string, slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category, slug } = await params;

    if (!categoryMap[category]) return {};

    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('title, content, thumbnail_url, category, created_at, updated_at, slug, seo_description')
        .eq('slug', slug)
        .single();

    if (!post) {
        return { title: '記事が見つかりません' };
    }

    const categoryName = categoryMap[category].title;
    // SEO descriptionが設定されていればそれを使用し、なければ本文の先頭から抽出
    const plainText = post.seo_description || post.content.replace(/[#*`_~>-]/g, '').slice(0, 120) + (post.content.length > 120 ? '...' : '');

    return {
        title: `${post.title} | ${categoryName}`,
        description: plainText,
        keywords: [post.title, ...categoryMap[category].keywords],
        alternates: {
            // Absolute canonical URL
            canonical: `/${category}/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: plainText,
            url: `/${category}/${slug}`,
            siteName: 'Portal Hub',
            images: [
                {
                    url: post.thumbnail_url || `/images/hero-${category === 'game_tech' ? 'game' : category === 'ai_tech' ? 'ai' : category === 'dev_diary' ? 'diary' : category === 'daily_life' ? 'daily' : 'hobbies'}.png`,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'ja_JP',
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            section: categoryName,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            images: [post.thumbnail_url || `/images/hero-${category === 'game_tech' ? 'game' : category === 'ai_tech' ? 'ai' : category === 'dev_diary' ? 'diary' : category === 'daily_life' ? 'daily' : 'hobbies'}.png`],
        },
    }
}

export default async function ArticlePage({ params }: Props) {
    const { category, slug } = await params;

    if (!categoryMap[category]) {
        notFound();
    }

    const categoryInfo = categoryMap[category];
    const supabase = await createClient();

    // 単一記事と、関連する最新記事の取得
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('category', categoryInfo.enum)
        .single();

    if (error || !post) {
        notFound();
    }

    // Related posts from same category
    const { data: relatedPosts } = await supabase
        .from('posts')
        .select('id, title, slug, thumbnail_url, created_at')
        .eq('category', categoryInfo.enum)
        .neq('id', post.id)
        .order('created_at', { ascending: false })
        .limit(3);

    const defaultImage = `/images/hero-${category === 'game_tech' ? 'game' : category === 'ai_tech' ? 'ai' : category === 'dev_diary' ? 'diary' : category === 'daily_life' ? 'daily' : 'hobbies'}.png`;
    const postImage = post.thumbnail_url || defaultImage;

    // Format dates
    const publishDate = new Date(post.created_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    const updateDate = new Date(post.updated_at).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

    // 構造化データ (JSON-LD) - Strict Article & BreadcrumbList
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            image: [
                new URL(postImage, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString()
            ],
            datePublished: post.created_at,
            dateModified: post.updated_at,
            author: [{
                '@type': 'Person',
                name: 'Portal Hub Author',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
            }],
            publisher: {
                '@type': 'Organization',
                name: 'Portal Hub',
                logo: {
                    '@type': 'ImageObject',
                    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/icon.png`
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${category}/${slug}`
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'ホーム',
                    item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: categoryInfo.title,
                    item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${category}`
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: post.title,
                    item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${category}/${slug}`
                }
            ]
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <SiteHeader />

            <main className="flex-1">
                {/* Article Hero */}
                <div className="relative w-full bg-card/30 border-b border-border/40">
                    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-12">
                        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                                <Home className="mr-1 h-3.5 w-3.5" />
                                Home
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <Link href={`/${category}`} className="hover:text-primary transition-colors">
                                {categoryInfo.title}
                            </Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-foreground border-b border-border/50 max-w-[150px] truncate md:max-w-[300px]" title={post.title}>{post.title}</span>
                        </nav>

                        <div className="mb-6 flex items-center gap-3">
                            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold border ${categoryInfo.color}`}>
                                {categoryInfo.title}
                            </span>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5" title="公開日">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    <time dateTime={post.created_at}>{publishDate}</time>
                                </div>
                                {post.updated_at !== post.created_at && (
                                    <div className="flex items-center gap-1.5 hidden sm:flex" title="最終更新日">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>更新: <time dateTime={post.updated_at}>{updateDate}</time></span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

                        {/* Main Content Area */}
                        <article className="min-w-0">
                            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30 shadow-sm">
                                <Image
                                    src={postImage}
                                    alt={post.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>

                            {/* Markdown Rendered Content */}
                            <div className="prose prose-zinc dark:prose-invert prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-h3:mt-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none text-foreground/90 leading-relaxed font-sans mt-8 bg-card/50 p-6 md:p-10 rounded-xl border border-border/50 shadow-sm">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </ReactMarkdown>
                            </div>

                            {/* Interaction / Share */}
                            <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">Share:</span>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                        <Twitter className="h-4 w-4" />
                                        <span className="sr-only">Share on Twitter</span>
                                    </button>
                                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                                        <Share2 className="h-4 w-4" />
                                        <span className="sr-only">Copy Link</span>
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar (Related Posts) */}
                        <aside className="sticky top-20 hidden lg:block self-start">
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <div className="mb-6 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <h3 className="text-lg font-bold text-foreground">関連記事</h3>
                                </div>

                                {relatedPosts && relatedPosts.length > 0 ? (
                                    <div className="flex flex-col gap-5">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link
                                                key={relatedPost.id}
                                                href={`/${category}/${relatedPost.slug}`}
                                                className="group flex gap-4 overflow-hidden"
                                            >
                                                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded border border-border/50 bg-muted">
                                                    <Image
                                                        src={relatedPost.thumbnail_url || defaultImage}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <time className="mt-1 text-[10px] text-muted-foreground">
                                                        {new Date(relatedPost.created_at).toLocaleDateString('ja-JP')}
                                                    </time>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">関連記事はありません。</p>
                                )}

                                <div className="mt-8 border-t border-border pt-6">
                                    <Link
                                        href={`/${category}`}
                                        className={`block w-full rounded-lg border py-2 text-center text-sm font-medium transition-colors hover:bg-muted ${categoryInfo.color}`}
                                    >
                                        {categoryInfo.title}の一覧へ
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
