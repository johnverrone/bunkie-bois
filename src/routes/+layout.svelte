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
			provider: 'google',
			options: {
				redirectTo: window.location.origin
			}
		});
	}

	async function localOtpSignIn() {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: import.meta.env.VITE_LOCAL_TEST_EMAIL,
			options: {
				emailRedirectTo: window.location.origin
			}
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
		<Button on:click={signout} variant="secondary">Logout</Button>
	</div>
	<slot />
{:else}
	<div class="auth-button login">
		{#if import.meta.env.DEV}
			<Button on:click={localOtpSignIn}>Login</Button>
		{:else}
			<Button on:click={signInWithGoogle}>Login</Button>
		{/if}
	</div>
{/if}

<style lang="scss" global>
	@import '../reset.css';

	:root {
		--font-family: 'Nunito';

		font-family: var(--font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		--green: hsl(108deg 13% 83%);

		--dp-01: hsla(0deg 100% 100% / 0.05);
		--dp-02: hsla(0deg 100% 100% / 0.07);
		--dp-12: hsla(0deg 100% 100% / 0.14);
		--dp-24: hsla(0deg 100% 100% / 0.16);

		--background: hsl(185deg 33% 16%);
		--secondary-background: hsl(185deg 33% 40%);
		--foreground: #fefefe;
		--primary: hsl(106deg 19% 55%);
		--secondary: hsl(105deg 90% 80%);
		--destructive: hsl(60deg 90% 70%);

		background-color: var(--background);
		color: var(--foreground);
	}

	body {
		overflow-y: hidden;
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

	button {
		border: none;
		background: none;
		font: inherit;
		font-weight: bold;
		border-radius: 4px;
		padding: 0;
		cursor: pointer;
	}

	.auth-button {
		position: absolute;
		top: 10px;
		right: 1rem;

		&.login {
			top: calc(50% - 18px);
			right: calc(50% - 27px);
		}
	}
</style>
