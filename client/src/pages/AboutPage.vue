<script setup lang="ts">
</script>

<template>
    <div class="about-page">
        <h1 class="title">About Trade-IT</h1>

        <p class="intro">
            Trade-IT is a simple marketplace for buying and selling used products.
            Our goal is to make it easy for people to give items a second life
            instead of throwing them away.
        </p>

        <section class="section">
            <h2>What we do</h2>
            <p>
                Trade-IT connects people who want to sell items they no longer need
                with people who are looking for affordable, second-hand products.
                From furniture and electronics to everyday items, everything on
                Trade-IT is listed directly by users.
            </p>
        </section>

        <section class="section">
            <h2>Why Trade-IT?</h2>
            <ul>
                <li>Save money by buying used</li>
                <li>Reduce waste and support reuse</li>
                <li>Sell items quickly and easily</li>
                <li>No complicated setup or hidden fees</li>
            </ul>
        </section>

        <section class="section">
            <h2>Our vision</h2>
            <p>
                We believe that most products still have value long after their
                first owner is done using them. Trade-IT exists to make reuse
                normal, simple, and accessible for everyone.
            </p>
        </section>
    </div>
</template>

<style scoped>
.about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.title {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.intro {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.section {
    margin-bottom: 2rem;
}

.section h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.section p {
    line-height: 1.6;
}

.section ul {
    padding-left: 1.2rem;
}

.section li {
    margin-bottom: 0.4rem;
}
</style>
