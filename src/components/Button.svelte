<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
	on:click
	{type}
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	{...$$restProps}
>
	<slot />
</button>

<style lang="scss">
	button {
		border: none;
		font: inherit;
		font-weight: bold;
		border-radius: 4px;
		height: 36px;
		cursor: pointer;
	}

	.primary {
		$bg-color: hsl(55deg 93% 72%);
		background-color: $bg-color;
		color: #121212;

		&:hover {
			background-color: scale-color($bg-color, $lightness: -10%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -20%);
		}
	}

	.secondary {
		$bg-color: hsl(106deg 19% 55%);
		background-color: $bg-color;
		color: #fefefe;

		&:hover {
			background-color: scale-color($bg-color, $lightness: -10%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -20%);
		}
	}
</style>
