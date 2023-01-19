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
      rounds: {
        Row: {
          created_at: string
          date: string | null
          id: number
          name: string
          trip_id: number
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          name: string
          trip_id: number
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          name?: string
          trip_id?: number
        }
      }
      trip_players: {
        Row: {
          handicap: number
          name: string
          player_id: number
          trip_id: number
        }
        Insert: {
          handicap: number
          name: string
          player_id?: number
          trip_id: number
        }
        Update: {
          handicap?: number
          name?: string
          player_id?: number
          trip_id?: number
        }
      }
      trips: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          name?: string
          start_date?: string | null
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
