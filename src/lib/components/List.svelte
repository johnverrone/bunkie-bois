<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ListProps {
		children: Snippet;
	}

	let { children }: ListProps = $props();
</script>

<ul>
	{@render children()}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0;
		list-style: none;
	}
</style>
