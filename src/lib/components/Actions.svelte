<script lang="ts">
	import { createPopper, type Instance } from '@popperjs/core';
	import { onMount, type Snippet } from 'svelte';
	import { clickOutside } from '$lib/utils/click_outside';

	interface ActionsProps {
		anchor?: HTMLElement;
		opened: boolean;
		children: Snippet;
	}

	let { anchor, opened = $bindable(false), children }: ActionsProps = $props();

	let el: HTMLElement;
	let popperInstance: Instance | null;

	function close() {
		opened = false;
		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}
	}

	function stopPropagation(e: Event) {
		e.stopPropagation();
	}

	onMount(() => {
		if (anchor) {
			popperInstance = createPopper(anchor, el, {
				placement: 'bottom-end'
			});
		}
	});
</script>

<div
	bind:this={el}
	class="action-menu"
	onclick={stopPropagation}
	onkeydown={stopPropagation}
	use:clickOutside
	onoutclick={() => close()}
	role="menu"
	tabindex={-1}
>
	{@render children()}
</div>

<style lang="scss">
	.action-menu {
		background: var(--secondary-background);
		padding: 16px 8px;
		border-radius: 4px;
		box-shadow:
			rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
		z-index: 1;
	}
</style>
