<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

const goToPokemonListVies = () => {
  router.push({ name: 'PokemonList' });
};
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="logo" @click="goToPokemonListVies">Pokedex</h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  text-align: center;
  cursor: pointer;
  display: block;
  margin: 0 auto 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0.5rem 1rem;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
