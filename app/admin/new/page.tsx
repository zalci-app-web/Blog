import { notFound } from 'next/navigation';
import { createPost } from '../actions';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NewPostPage() {
    // ローカル環境以外からのアクセスを遮断（念のため）
    if (process.env.NODE_ENV !== 'development') {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 py-12 px-4 md:px-8 max-w-4xl mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">新規記事作成 (LOCAL ADMIN)</h1>
                    <p className="text-muted-foreground mt-2">このページはローカル開発環境でのみ表示されます。</p>
                </div>

                <form action={createPost} className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-semibold text-foreground">タイトル *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="記事のタイトル"
                        />
                    </div>

                    {/* Slug & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-sm font-semibold text-foreground">スラッグ (URL用) *</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                required
                                className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="ex: my-first-post"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-semibold text-foreground">カテゴリ *</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="game_tech">ゲーム技術</option>
                                <option value="ai_tech">AI技術</option>
                                <option value="dev_diary">制作中ゲーム日記</option>
                                <option value="daily_life">日常まとめ</option>
                                <option value="hobbies">趣味・エンタメ</option>
                            </select>
                        </div>
                    </div>

                    {/* Thumbnail URL */}
                    <div className="space-y-2">
                        <label htmlFor="thumbnail_url" className="text-sm font-semibold text-foreground">サムネイル画像URL</label>
                        <input
                            type="text"
                            id="thumbnail_url"
                            name="thumbnail_url"
                            className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="/images/hero-game.jpg (未入力でデフォルト画像)"
                        />
                    </div>

                    {/* SEO Description */}
                    <div className="space-y-2">
                        <label htmlFor="seo_description" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            SEO ディスクリプション
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">NEW</span>
                        </label>
                        <p className="text-xs text-muted-foreground mb-2">検索結果やTwitter Cardに表示される概要文です。100文字程度を推奨します。</p>
                        <textarea
                            id="seo_description"
                            name="seo_description"
                            rows={2}
                            className="w-full flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="検索結果に表示させたい魅力的な紹介文を入力してください"
                        ></textarea>
                    </div>

                    {/* Content (Markdown) */}
                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-semibold text-foreground">本文 (Markdown) *</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={15}
                            className="w-full flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="# 大きな見出し&#10;&#10;ここにMarkdown形式で本文を記述します。&#10;&#10;- リストアイテム1&#10;- リストアイテム2&#10;&#10;ここは段落です。"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
                        >
                            記事を公開する
                        </button>
                    </div>
                </form>
            </main>
            <SiteFooter />
        </div>
    );
}
