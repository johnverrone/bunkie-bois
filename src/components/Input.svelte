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
	}
</style>
