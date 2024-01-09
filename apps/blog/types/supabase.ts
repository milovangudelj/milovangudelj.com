export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      guestbook: {
        Row: {
          author_pfp: string
          body: string
          created_at: string
          created_by: string
          id: string
          is_published: boolean
          uncensored_body: string
        }
        Insert: {
          author_pfp: string
          body: string
          created_at?: string
          created_by: string
          id?: string
          is_published: boolean
          uncensored_body: string
        }
        Update: {
          author_pfp?: string
          body?: string
          created_at?: string
          created_by?: string
          id?: string
          is_published?: boolean
          uncensored_body?: string
        }
        Relationships: []
      }
      spotify_access_token: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          value: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          value: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          value?: string
        }
        Relationships: []
      }
      spotify_refresh_token: {
        Row: {
          created_at: string
          id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          value?: string
        }
        Relationships: []
      }
      view_count: {
        Row: {
          created_at: string
          id: string
          views: number
          website: string
        }
        Insert: {
          created_at?: string
          id?: string
          views?: number
          website: string
        }
        Update: {
          created_at?: string
          id?: string
          views?: number
          website?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
