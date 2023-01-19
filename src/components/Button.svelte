<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button on:click {type} {...$$restProps}>
	<slot />
</button>

<style>
	button {
		border: none;
		font: inherit;
		font-weight: bold;
		background-color: lightseagreen;
		color: white;
		border-radius: 4px;
		height: 36px;
	}
</style>
