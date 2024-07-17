declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		onoutclick?: MouseEventHandler<T> | undefined | null;
	}
}
