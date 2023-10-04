<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' | 'destructive' = 'primary';
	export let fullWidth: boolean = false;
	export let disabled: boolean = false;
</script>

<button
	on:click
	{type}
	{disabled}
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:destructive={variant === 'destructive'}
	class:fullWidth
	class:disabled
	{...$$restProps}
>
	<slot />
</button>

<style lang="scss">
	button {
		height: 36px;
		padding: 0 6px;

		&:disabled {
			pointer-events: none;
			background-color: var(--dp-02);
			color: var(--dp-12);
		}
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
		color: var(--secondary);

		&:hover {
			background-color: scale-color($bg-color, $lightness: -20%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -40%);
		}
	}

	.destructive {
		$bg-color: hsl(18, 61%, 49%);
		background-color: $bg-color;
		color: var(--foreground);

		&:hover {
			background-color: scale-color($bg-color, $lightness: -20%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -40%);
		}
	}
</style>
