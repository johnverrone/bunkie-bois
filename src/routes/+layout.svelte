<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>{$page.data.title || 'Bunkie Bois'}</title>
</svelte:head>

<slot />

<style global>
	@import '../reset.css';

	:root {
		--font-family: 'Nunito';

		font-family: var(--font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		--green: hsl(108deg 13% 83%);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 800;
	}

	h2 {
		font-size: 2rem;
		font-weight: 700;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: 700;
	}

	h4 {
		font-size: 1.25rem;
		font-weight: 500;
	}

	h5 {
		font-size: 1rem;
		font-weight: 700;
	}

	h1,
	h2,
	h3 {
		text-align: center;
	}
</style>
