import { writable } from 'svelte/store';

export const route = writable(window.location.hash || '#/');

window.addEventListener('hashchange', () => {
	route.set(window.location.hash || '#/');
});
