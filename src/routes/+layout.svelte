<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import Button from '$lib/components/Button.svelte';
	import { invalidateAll } from '$app/navigation';
	import NavBar from '$lib/components/NavBar.svelte';

	let { data, children } = $props();
	let errorMessage = $state<string>();

	async function signInWithGoogle() {
		// Safari bug where iOS won't open new windows in async functions
		let w = window.open();

		try {
			await pb.collection('users').authWithOAuth2({
				provider: 'google',
				urlCallback: (url) => {
					if (w) {
						w.location.href = url;
					}
					return;
				}
			});
			invalidateAll();
		} catch (e) {
			console.error(e);
			errorMessage = 'There was an error logging in.';
		}
	}
</script>

<svelte:head>
	<title>{$page.data.title || 'Bunkie Bois'}</title>
</svelte:head>

{#if data.isAuthed}
	<NavBar
		items={[
			{
				href: `/trips`,
				label: 'Trips',
				active: $page.route.id?.startsWith('/trips') ?? false
			},
			{
				href: `/courses`,
				label: 'Courses',
				active: $page.route.id?.startsWith('/courses') ?? false
			},
			{
				href: `/settings`,
				label: 'Settings',
				active: $page.route.id?.startsWith('/settings') ?? false
			}
		]}
	/>
	{@render children()}
{:else}
	<div class="auth-button login">
		<Button onclick={signInWithGoogle}>Login with Google</Button>
	</div>
	{#if errorMessage}
		<span>{errorMessage}</span>
	{/if}
{/if}

<style lang="scss" global>
	@import '../reset.css';

	:root {
		// fonts
		--font-family: 'Nunito';
		font-family:
			var(--font-family),
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol';

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
		font-size: 2rem;
		font-weight: 800;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 700;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 700;
	}

	h4 {
		font-size: 1rem;
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
