import { navigating } from '$app/stores';
import { derived } from 'svelte/store';

const createDelayedNavigation = () => {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return derived(navigating, (n, set) => {
		if (timer) clearTimeout(timer);
		if (n) {
			timer = setTimeout(() => set(true), 500);
		}
		set(false);
	});
};

export const delayedNavigation = createDelayedNavigation();
