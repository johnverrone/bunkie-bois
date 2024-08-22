<script lang="ts">
	import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { clickOutside } from '$lib/utils/click_outside';

	interface ActionsProps {
		anchor?: HTMLElement;
		opened: boolean;
		children: Snippet;
	}

	let { anchor, opened = $bindable(false), children }: ActionsProps = $props();

	let el: HTMLElement;
	let cleanup: () => void;

	function close() {
		opened = false;
		cleanup();
	}

	function stopPropagation(e: Event) {
		e.stopPropagation();
	}

	onMount(() => {
		if (anchor) {
			cleanup = autoUpdate(anchor, el, async () => {
				const pos = await computePosition(anchor, el, {
					placement: 'bottom',
					middleware: [offset(4), flip(), shift({ padding: 12 })]
				});
				Object.assign(el.style, {
					left: `${pos.x}px`,
					top: `${pos.y}px`
				});
			});
		}
	});

	onDestroy(() => cleanup());
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
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
		background: var(--secondary-background);
		padding: 16px 8px;
		border-radius: 4px;
		box-shadow:
			rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
		z-index: 1;
	}
</style>
