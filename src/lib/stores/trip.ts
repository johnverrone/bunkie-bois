import { writable } from 'svelte/store';

export const trip = writable<number | null>(null);
