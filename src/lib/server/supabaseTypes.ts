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
      players: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
      }
      trip_players: {
        Row: {
          trip_id: number
          player_id: number
          handicap: number
          name: string
        }
        Insert: {
          trip_id: number
          player_id?: number
          handicap: number
          name: string
        }
        Update: {
          trip_id?: number
          player_id?: number
          handicap?: number
          name?: string
        }
      }
      trips: {
        Row: {
          id: number
          name: string
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
