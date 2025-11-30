<script lang="ts">
    import ItemCard from "../components/ItemCard.svelte";
    
    // mock items – replace with API fetch later
    const items = [
        { id: 1, title: "iPhone 12", price: 2300, image: "/items/iphone.jpg" },
        { id: 2, title: "Gaming Chair", price: 650, image: "/items/chair.jpg" },
        {
            id: 3,
            title: "Mechanical Keyboard",
            price: 350,
            image: "/items/keyboard.jpg",
        },
        {
            id: 4,
            title: "Sony WH-1000XM3",
            price: 900,
            image: "/items/headphones.jpg",
        },
    ];
</script>

<section class="hero">
    <h1>Buy & Sell Used Items</h1>
    <p>
        Your marketplace for second-hand tech, furniture, gaming gear and more.
    </p>

    <button class="cta">Browse Items</button>
</section>

<h2 class="section-title">Featured Items</h2>

<div class="grid">
    {#each items as item}
        <ItemCard {item} />
    {/each}
</div>

<style>
    .hero {
        text-align: center;
        margin: 4rem 0 3rem;
    }

    .hero h1 {
        font-size: 2.8rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .hero p {
        color: #666;
        margin-bottom: 1.5rem;
    }

    .cta {
        padding: 0.8rem 1.6rem;
        border-radius: 8px;
        background: #111;
        color: white;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        transition: 0.2s;
    }

    .cta:hover {
        background: #333;
    }

    .section-title {
        font-size: 1.6rem;
        margin-bottom: 1.2rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1.5rem;
        padding-bottom: 3rem;
    }
</style>
