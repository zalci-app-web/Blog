'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
    if (process.env.NODE_ENV !== 'development') {
        throw new Error('Not allowed in production');
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies';
    const seo_description = formData.get('seo_description') as string;
    const thumbnail_url = formData.get('thumbnail_url') as string;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('posts')
        .insert([
            {
                title,
                slug,
                content,
                category,
                seo_description: seo_description || null,
                thumbnail_url: thumbnail_url || null,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post: ' + error.message);
    }

    // Clear cache for related routes
    revalidatePath('/');
    revalidatePath(`/${category}`);

    // Redirect to the newly created post
    redirect(`/${category}/${slug}`);
}
