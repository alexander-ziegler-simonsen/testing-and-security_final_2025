<script lang="ts">
	export let item: {
		id: number;
		title: string;
		price: number;
		image: string;
	};
</script>

<div class="card">
	<img src={item.image} alt={item.title} />
	<h3>{item.title}</h3>
	<p class="price">{item.price} DKK</p>
	<button class="buy-btn">View</button>
</div>

<style>
	.card {
		background: #fff;
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.06);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		transition: transform 0.15s;
	}

	.card:hover {
		transform: translateY(-4px);
	}

	img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 8px;
	}

	h3 {
		font-size: 1.1rem;
	}

	.price {
		font-weight: 600;
		color: #333;
	}

	.buy-btn {
		margin-top: auto;
		padding: 0.5rem;
		border: none;
		border-radius: 8px;
		background: #111;
		color: white;
		cursor: pointer;
		transition: 0.2s;
	}

	.buy-btn:hover {
		background: #333;
	}
</style>
