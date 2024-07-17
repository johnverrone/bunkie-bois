<script lang="ts">
	import type { Snippet } from 'svelte';

	interface MainProps {
		children: Snippet;
	}

	let { children }: MainProps = $props();
</script>

<main>
	{@render children()}
</main>

<style lang="scss">
	main {
		height: 100%;
		padding: 0 1rem 2rem 1rem;
		grid-area: main;
		overflow: auto;
	}
</style>
