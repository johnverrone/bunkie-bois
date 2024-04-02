declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:outclick'?: MouseEventHandler<T> | undefined | null;
	}
}
