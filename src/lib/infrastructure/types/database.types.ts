export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			favorites: {
				Row: {
					created_at: string;
					id: string;
					post: string;
					user: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					post: string;
					user: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					post?: string;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'favorites_post_fkey';
						columns: ['post'];
						isOneToOne: false;
						referencedRelation: 'post';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'favorites_post_fkey';
						columns: ['post'];
						isOneToOne: false;
						referencedRelation: 'posts_with_author';
						referencedColumns: ['id'];
					}
				];
			};
			geocode: {
				Row: {
					latitude: number | null;
					longitude: number | null;
					post_id: string;
				};
				Insert: {
					latitude?: number | null;
					longitude?: number | null;
					post_id?: string;
				};
				Update: {
					latitude?: number | null;
					longitude?: number | null;
					post_id?: string;
				};
				Relationships: [];
			};
			post: {
				Row: {
					address: string | null;
					author: string;
					category: Database['public']['Enums']['categories'] | null;
					description: string;
					draft: boolean;
					id: string;
					image_path: string | null;
					max_age: number | null;
					min_age: number;
					phone: string;
					postcode: number | null;
					price: number | null;
					title: string;
					updated_at: string | null;
				};
				Insert: {
					address?: string | null;
					author: string;
					category?: Database['public']['Enums']['categories'] | null;
					description?: string;
					draft?: boolean;
					id?: string;
					image_path?: string | null;
					max_age?: number | null;
					min_age?: number;
					phone: string;
					postcode?: number | null;
					price?: number | null;
					title: string;
					updated_at?: string | null;
				};
				Update: {
					address?: string | null;
					author?: string;
					category?: Database['public']['Enums']['categories'] | null;
					description?: string;
					draft?: boolean;
					id?: string;
					image_path?: string | null;
					max_age?: number | null;
					min_age?: number;
					phone?: string;
					postcode?: number | null;
					price?: number | null;
					title?: string;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'post_author_fkey';
						columns: ['author'];
						isOneToOne: false;
						referencedRelation: 'user';
						referencedColumns: ['id'];
					}
				];
			};
			user: {
				Row: {
					avatar_url: string | null;
					created_at: string;
					id: string;
					name: string;
					role: Database['public']['Enums']['roles'];
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string;
					id?: string;
					name: string;
					role?: Database['public']['Enums']['roles'];
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string;
					id?: string;
					name?: string;
					role?: Database['public']['Enums']['roles'];
				};
				Relationships: [];
			};
		};
		Views: {
			posts_with_author: {
				Row: {
					address: string | null;
					author_id: string | null;
					author_name: string | null;
					category: Database['public']['Enums']['categories'] | null;
					description: string | null;
					id: string | null;
					image_path: string | null;
					post_updated: string | null;
					price: number | null;
					title: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'post_author_fkey';
						columns: ['author_id'];
						isOneToOne: false;
						referencedRelation: 'user';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			categories:
				| 'programming'
				| 'sport'
				| 'math'
				| 'informatics'
				| 'art'
				| 'design'
				| 'architecture'
				| 'social_science'
				| 'biology'
				| 'ecology'
				| 'chemistry'
				| 'history';
			roles: 'user' | 'author';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
