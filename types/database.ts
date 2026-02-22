export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: string
                    category: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies'
                    seo_description: string | null
                    thumbnail_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    content: string
                    category: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies'
                    seo_description?: string | null
                    thumbnail_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    content?: string
                    category?: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies'
                    seo_description?: string | null
                    thumbnail_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            post_category: 'game_tech' | 'ai_tech' | 'dev_diary' | 'daily_life' | 'hobbies'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
