<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '@components/Button.svelte';

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

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}

	async function signout() {
		const { error } = await supabase.auth.signOut();
		if (!error) window.location.reload();
	}
</script>

<svelte:head>
	<title>{$page.data.title || 'Bunkie Bois'}</title>
</svelte:head>

{#if $page.data.session}
	<div class="auth-button">
		<Button on:click={signout}>Logout</Button>
	</div>
	<slot />
{:else}
	<div class="auth-button">
		<Button on:click={signInWithGoogle}>Login</Button>
	</div>
{/if}

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

	.auth-button {
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
