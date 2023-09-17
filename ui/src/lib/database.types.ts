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
      permissions: {
        Row: {
          created_at: string
          id: string
          mode: string | null
          user_id: string | null
          wallet_address: string | null
          zkp: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          mode?: string | null
          user_id?: string | null
          wallet_address?: string | null
          zkp?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mode?: string | null
          user_id?: string | null
          wallet_address?: string | null
          zkp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
