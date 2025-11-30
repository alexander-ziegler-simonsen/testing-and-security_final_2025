<script lang="ts">
	import { route } from './lib/router';
	import NavBar from './components/NavBar.svelte';

	import Home from './pages/Home.svelte';
	import About from './pages/About.svelte';

	// sample items
	const items = [
		{ id: 1, title: 'iPhone 12', price: 2300, image: '/items/iphone.jpg' },
		{ id: 2, title: 'Gaming Chair', price: 650, image: '/items/chair.jpg' }
	];
</script>

<NavBar />

{#if $route === '#/'}
	<Home {items} />

{:else if $route.startsWith('#/about')}
	<About />
{/if}
