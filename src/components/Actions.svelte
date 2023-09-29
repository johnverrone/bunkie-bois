<script lang="ts">
	import { createPopper, type Instance } from '@popperjs/core';
	import { onMount } from 'svelte';
	import { clickOutside } from '@utils/click_outside';

	export let anchor: HTMLElement;
	export let opened = false;

	let el: HTMLElement;
	let popperInstance: Instance | null;

	function close() {
		opened = false;
		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}
	}

	onMount(() => {
		popperInstance = createPopper(anchor, el, {
			placement: 'bottom-end'
		});
	});
</script>

<div
	bind:this={el}
	class="action-menu"
	on:click|stopPropagation={() => {}}
	on:keydown|stopPropagation={() => {}}
	use:clickOutside
	on:outclick={() => close()}
>
	<slot />
</div>

<style lang="scss">
	.action-menu {
		background: var(--secondary-background);
		padding: 16px 8px;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
</style>
