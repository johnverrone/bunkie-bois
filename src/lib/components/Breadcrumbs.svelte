<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BreadcrumbsProps {
		children: Snippet;
	}

	let { children }: BreadcrumbsProps = $props();
</script>

<nav>
	{@render children()}
</nav>

<style lang="scss">
	nav {
		margin-bottom: 10px;
	}
</style>
