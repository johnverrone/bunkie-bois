<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';

	interface PortalProps {
		children: Snippet;
	}

	let { children }: PortalProps = $props();

	let ref: HTMLElement;
	let portal: HTMLDivElement;

	onMount(() => {
		portal = document.createElement('div');
		portal.className = 'portal';
		document.body.appendChild(portal);
		portal.appendChild(ref);
	});

	onDestroy(() => {
		document.body.removeChild(portal);
	});
</script>

<div class="portal-clone">
	<div bind:this={ref}>
		{@render children()}
	</div>
</div>

<style>
	.portal-clone {
		display: none;
	}
</style>
