<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let email: string;
	let loginCode: string;
	let authMethod: 'otp' | 'google' | null = null;
	let emailSent: boolean = false;

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

	function signInWithGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin
			}
		});
	}

	function getOtp() {
		supabase.auth.signInWithOtp({
			email: email || import.meta.env.VITE_LOCAL_TEST_EMAIL,
			options: {
				emailRedirectTo: window.location.origin
			}
		});
		emailSent = true;
	}

	function signInWithCode() {
		supabase.auth.verifyOtp({
			type: 'email',
			email: email || import.meta.env.VITE_LOCAL_TEST_EMAIL,
			token: loginCode
		});
	}

	function cancel() {
		emailSent = false;
		email = '';
		authMethod = null;
	}
</script>

<svelte:head>
	<title>{$page.data.title || 'Bunkie Bois'}</title>
</svelte:head>

{#if $page.data.session}
	<slot />
{:else}
	<div class="auth-button login">
		{#if !authMethod}
			<Button on:click={() => (authMethod = 'otp')}>Login with One Time Password</Button>
			<Button on:click={signInWithGoogle}>Login with Google</Button>
		{:else if authMethod === 'otp'}
			{#if emailSent}
				<p>An email has been sent to <strong>{email}</strong>. Enter the login code:</p>
				<Input type="text" inputmode="numeric" bind:value={loginCode} />
				<Button on:click={signInWithCode}>Login</Button>
				<Button on:click={cancel}>Cancel</Button>
			{:else}
				<p>Enter your email:</p>
				<Input type="email" bind:value={email} />
				<Button on:click={getOtp}>Get Login Code</Button>
			{/if}
		{/if}
	</div>
{/if}

<style lang="scss" global>
	@import '../reset.css';

	:root {
		// fonts
		--font-family: 'Nunito';
		font-family: var(--font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		// colors
		--green: hsl(106deg 19% 55%);
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
		--disabled: hsl(0deg 0% 50%);

		--gold: hsl(51deg 100% 80%);
		--light-orange: hsl(37deg 36% 60%);
		--mid-orange: hsl(37deg 100% 59%);
		--dark-orange: hsl(17deg 100% 59%);

		--eagle: var(--gold);
		--birdie: var(--gold);
		--bogey: var(--light-orange);
		--double: var(--light-orange);
		--triple: var(--dark-orange);

		// sizing
		--nav-height: 80px;

		background-color: var(--background);
		color: var(--foreground);
	}

	body {
		overflow-y: hidden;
		display: grid;
		grid-template-rows: min-content 1fr var(--nav-height);
		grid-template-areas:
			'header'
			'main'
			'nav';
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

	a {
		text-decoration: none;
		color: var(--secondary);
		font-weight: bold;

		&:hover {
			text-decoration: underline;
		}
	}

	.auth-button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		grid-area: main;
		gap: 8px;
		width: 80%;
	}
</style>
