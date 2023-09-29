export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			courses: {
				Row: {
					created_at: string;
					id: number;
					name: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					name: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			hole_info: {
				Row: {
					created_at: string | null;
					handicap: number;
					hole_number: number;
					par: number;
					tee_box_id: number;
					yardage: number;
				};
				Insert: {
					created_at?: string | null;
					handicap: number;
					hole_number: number;
					par: number;
					tee_box_id: number;
					yardage: number;
				};
				Update: {
					created_at?: string | null;
					handicap?: number;
					hole_number?: number;
					par?: number;
					tee_box_id?: number;
					yardage?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'hole_info_tee_box_id_fkey';
						columns: ['tee_box_id'];
						referencedRelation: 'tee_boxes';
						referencedColumns: ['id'];
					}
				];
			};
			hole_scores: {
				Row: {
					hole_number: number;
					score: number | null;
					scorecard_id: number;
				};
				Insert: {
					hole_number: number;
					score?: number | null;
					scorecard_id: number;
				};
				Update: {
					hole_number?: number;
					score?: number | null;
					scorecard_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'hole_scores_scorecard_id_fkey';
						columns: ['scorecard_id'];
						referencedRelation: 'scorecards';
						referencedColumns: ['id'];
					}
				];
			};
			players: {
				Row: {
					handicap: number | null;
					id: number;
					name: string;
				};
				Insert: {
					handicap?: number | null;
					id?: number;
					name: string;
				};
				Update: {
					handicap?: number | null;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			rounds: {
				Row: {
					course_id: number;
					created_at: string;
					date: string | null;
					id: number;
					name: string;
					trip_id: number;
				};
				Insert: {
					course_id: number;
					created_at?: string;
					date?: string | null;
					id?: number;
					name: string;
					trip_id: number;
				};
				Update: {
					course_id?: number;
					created_at?: string;
					date?: string | null;
					id?: number;
					name?: string;
					trip_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'rounds_course_id_fkey';
						columns: ['course_id'];
						referencedRelation: 'courses';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'rounds_trip_id_fkey';
						columns: ['trip_id'];
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					}
				];
			};
			scorecards: {
				Row: {
					created_at: string | null;
					id: number;
					player_handicap: number | null;
					player_id: number;
					round_id: number;
					tee_box_id: number;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					player_handicap?: number | null;
					player_id: number;
					round_id: number;
					tee_box_id: number;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					player_handicap?: number | null;
					player_id?: number;
					round_id?: number;
					tee_box_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'scorecards_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'players';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'scorecards_round_id_fkey';
						columns: ['round_id'];
						referencedRelation: 'rounds';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'scorecards_tee_box_id_fkey';
						columns: ['tee_box_id'];
						referencedRelation: 'tee_boxes';
						referencedColumns: ['id'];
					}
				];
			};
			tee_boxes: {
				Row: {
					course_id: number;
					created_at: string | null;
					id: number;
					name: string;
					rating: number;
					slope: number;
				};
				Insert: {
					course_id: number;
					created_at?: string | null;
					id?: number;
					name: string;
					rating: number;
					slope: number;
				};
				Update: {
					course_id?: number;
					created_at?: string | null;
					id?: number;
					name?: string;
					rating?: number;
					slope?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'tee_boxes_course_id_fkey';
						columns: ['course_id'];
						referencedRelation: 'courses';
						referencedColumns: ['id'];
					}
				];
			};
			trip_players: {
				Row: {
					player_id: number;
					trip_id: number;
				};
				Insert: {
					player_id: number;
					trip_id: number;
				};
				Update: {
					player_id?: number;
					trip_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'trip_players_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'players';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_players_trip_id_fkey';
						columns: ['trip_id'];
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					}
				];
			};
			trips: {
				Row: {
					end_date: string | null;
					id: number;
					name: string | null;
					start_date: string | null;
				};
				Insert: {
					end_date?: string | null;
					id?: number;
					name?: string | null;
					start_date?: string | null;
				};
				Update: {
					end_date?: string | null;
					id?: number;
					name?: string | null;
					start_date?: string | null;
				};
				Relationships: [];
			};
			user_roles: {
				Row: {
					created_at: string;
					role: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					role?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					role?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'user_roles_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
