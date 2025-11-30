<script lang="ts">
	import { route } from '../lib/router';
</script>

<nav>
	<div class="logo">UsedMarket</div>

	<div class="links">
		<a href="#/" class:selected={$route === '#/'}>Home</a>
		<a href="#/about" class:selected={$route.startsWith('#/about')}>About</a>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: #fff;
		border-bottom: 1px solid #eee;
		position: sticky;
		top: 0;
	}

	.logo {
		font-weight: 700;
	}

	.links {
		display: flex;
		gap: 1.5rem;
	}

	a {
		text-decoration: none;
		color: #333;
	}

	a.selected {
		font-weight: 700;
		color: #000;
	}
</style>
