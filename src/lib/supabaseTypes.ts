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
      courses: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
      }
      hole_info: {
        Row: {
          created_at: string | null
          handicap: number
          hole_number: number
          par: number
          tee_box_id: number
          yardage: number
        }
        Insert: {
          created_at?: string | null
          handicap: number
          hole_number: number
          par: number
          tee_box_id: number
          yardage: number
        }
        Update: {
          created_at?: string | null
          handicap?: number
          hole_number?: number
          par?: number
          tee_box_id?: number
          yardage?: number
        }
      }
      hole_scores: {
        Row: {
          hole_number: number
          score: number | null
          scorecard_id: number
        }
        Insert: {
          hole_number: number
          score?: number | null
          scorecard_id: number
        }
        Update: {
          hole_number?: number
          score?: number | null
          scorecard_id?: number
        }
      }
      players: {
        Row: {
          handicap: number | null
          id: number
          name: string
        }
        Insert: {
          handicap?: number | null
          id?: number
          name: string
        }
        Update: {
          handicap?: number | null
          id?: number
          name?: string
        }
      }
      rounds: {
        Row: {
          course_id: number
          created_at: string
          date: string | null
          id: number
          name: string
          trip_id: number
        }
        Insert: {
          course_id: number
          created_at?: string
          date?: string | null
          id?: number
          name: string
          trip_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          date?: string | null
          id?: number
          name?: string
          trip_id?: number
        }
      }
      scorecards: {
        Row: {
          created_at: string | null
          id: number
          player_handicap: number | null
          player_id: number
          round_id: number
          tee_box_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          player_handicap?: number | null
          player_id: number
          round_id: number
          tee_box_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          player_handicap?: number | null
          player_id?: number
          round_id?: number
          tee_box_id?: number
        }
      }
      tee_boxes: {
        Row: {
          course_id: number
          created_at: string | null
          id: number
          name: string
          rating: number
          slope: number
        }
        Insert: {
          course_id: number
          created_at?: string | null
          id?: number
          name: string
          rating: number
          slope: number
        }
        Update: {
          course_id?: number
          created_at?: string | null
          id?: number
          name?: string
          rating?: number
          slope?: number
        }
      }
      trip_players: {
        Row: {
          player_id: number
          trip_id: number
        }
        Insert: {
          player_id: number
          trip_id: number
        }
        Update: {
          player_id?: number
          trip_id?: number
        }
      }
      trips: {
        Row: {
          end_date: string | null
          id: number
          name: string | null
          start_date: string | null
        }
        Insert: {
          end_date?: string | null
          id?: number
          name?: string | null
          start_date?: string | null
        }
        Update: {
          end_date?: string | null
          id?: number
          name?: string | null
          start_date?: string | null
        }
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
  }
}
