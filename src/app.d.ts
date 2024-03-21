import PocketBase from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			pb: PocketBase;
		}
		// interface Platform {}
		// interface PrivateEnv {}
		// interface PublicEnv {}
		interface Supabase {
			Database: import('./lib/supabaseTypes').Database;
			SchemaName: 'public';
		}
		// interface PageData {}
	}
}
