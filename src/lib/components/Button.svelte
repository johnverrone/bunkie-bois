<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface ButtonProps {
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'destructive' | 'destructive-secondary';
		fullWidth?: boolean;
		disabled?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		children: Snippet;
	}

	let {
		type = 'button',
		variant = 'primary',
		fullWidth = false,
		disabled = false,
		onclick,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<button
	{onclick}
	{type}
	{disabled}
	class:primary={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:destructive={variant === 'destructive'}
	class:destructive-secondary={variant === 'destructive-secondary'}
	class:fullWidth
	class:disabled
	{...rest}
>
	{@render children()}
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

	.destructive-secondary {
		$bg-color: hsl(185deg 33% 16%);
		background-color: inherit;
		color: hsl(18, 61%, 50%);

		&:hover {
			background-color: scale-color($bg-color, $lightness: -20%);
		}

		&:active {
			background-color: scale-color($bg-color, $lightness: -40%);
		}
	}
</style>
