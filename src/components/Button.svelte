<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' = 'primary';
	export let fullWidth: boolean = false;
</script>

<button
	on:click
	{type}
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:fullWidth
	{...$$restProps}
>
	<slot />
</button>

<style lang="scss">
	button {
		height: 36px;
		padding: 0 6px;
	}

	.fullWidth {
		width: 100%;
	}

	.primary {
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

	.secondary {
		$bg-color: hsl(185deg 33% 16%);
		background-color: inherit;
		color: var(--primary);

		&:hover {
			background-color: scale-color($bg-color, $lightness: -20%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -40%);
		}
	}
</style>
