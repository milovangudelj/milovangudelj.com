export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
