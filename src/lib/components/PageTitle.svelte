<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageTitleProps {
		children: Snippet;
	}

	let { children }: PageTitleProps = $props();
</script>

<header>
	<h3>{@render children()}</h3>
</header>

<style lang="scss">
	header {
		grid-area: header;
		padding: 1rem;
	}
</style>
