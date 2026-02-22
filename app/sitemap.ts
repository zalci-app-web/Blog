import type { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const supabase = await createClient()

    // Base routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ]

    // Category routes
    const categories = ['game_tech', 'ai_tech', 'dev_diary', 'daily_life', 'hobbies']
    categories.forEach((category) => {
        routes.push({
            url: `${baseUrl}/${category}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        })
    })

    // Article routes
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, category, updated_at')

    if (posts) {
        posts.forEach((post) => {
            routes.push({
                url: `${baseUrl}/${post.category}/${post.slug}`,
                lastModified: new Date(post.updated_at),
                changeFrequency: 'weekly',
                priority: 0.6,
            })
        })
    }

    return routes
}
