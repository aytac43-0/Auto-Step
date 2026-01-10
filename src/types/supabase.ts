export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    username: string | null
                    role: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    username?: string | null
                    role?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    username?: string | null
                    role?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    price: number
                    code: string | null
                    access_url: string | null
                    active: boolean
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    price: number
                    code?: string | null
                    access_url?: string | null
                    active?: boolean
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    price?: number
                    code?: string | null
                    access_url?: string | null
                    active?: boolean
                }
            }
            purchases: {
                Row: {
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
            }
        }
    }
}
