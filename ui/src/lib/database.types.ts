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
      logs: {
        Row: {
          body: string | null
          created_at: string
          id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          created_at: string
          id: string
          kyb: boolean | null
          location: string | null
          mode: string | null
          wallet_address: string | null
          zkp: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kyb?: boolean | null
          location?: string | null
          mode?: string | null
          wallet_address?: string | null
          zkp?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kyb?: boolean | null
          location?: string | null
          mode?: string | null
          wallet_address?: string | null
          zkp?: string | null
        }
        Relationships: []
      }
      pools: {
        Row: {
          apr: number | null
          created_at: string
          from_token: string | null
          id: number
          to_token: string | null
          total_liquidity: number | null
          US: boolean | null
        }
        Insert: {
          apr?: number | null
          created_at?: string
          from_token?: string | null
          id?: number
          to_token?: string | null
          total_liquidity?: number | null
          US?: boolean | null
        }
        Update: {
          apr?: number | null
          created_at?: string
          from_token?: string | null
          id?: number
          to_token?: string | null
          total_liquidity?: number | null
          US?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "pools_from_token_fkey"
            columns: ["from_token"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pools_to_token_fkey"
            columns: ["to_token"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          }
        ]
      }
      tokens: {
        Row: {
          created_at: string
          day_volume: number | null
          icon: string | null
          id: string
          liquidity: number | null
          price_change: number | null
          symbol: string | null
          usd_price: number | null
        }
        Insert: {
          created_at?: string
          day_volume?: number | null
          icon?: string | null
          id?: string
          liquidity?: number | null
          price_change?: number | null
          symbol?: string | null
          usd_price?: number | null
        }
        Update: {
          created_at?: string
          day_volume?: number | null
          icon?: string | null
          id?: string
          liquidity?: number | null
          price_change?: number | null
          symbol?: string | null
          usd_price?: number | null
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
