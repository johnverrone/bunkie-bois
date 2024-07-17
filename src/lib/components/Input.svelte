<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface InputProps extends HTMLInputAttributes {
		label?: string;
		value?: string | number;
		block?: boolean;
		focus?: (el: HTMLInputElement) => void;
	}

	let {
		label,
		value = $bindable(),
		block = false,
		focus = () => {},
		...rest
	}: InputProps = $props();
</script>

<label>
	{#if label}{label}{/if}
	<input {...rest} id={label} class:block bind:value use:focus />
</label>

<style lang="scss">
	input {
		width: 100%;
		font: inherit;
		height: 36px;
		background-color: var(--dp-12);
		color: var(--foreground);
		border: none;
		border-radius: 4px;
		padding: 2px 4px;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: 1px;
		color-scheme: dark;

		&.block {
			display: block;
		}
	}
</style>
