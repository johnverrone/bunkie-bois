<script lang="ts">
	export let value: string | number | undefined = undefined;
	export let focus: (el: HTMLInputElement) => void = () => {};
</script>

<input {...$$restProps} bind:value use:focus />

<style>
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
	}
</style>
