<script setup lang="js">
import { onMounted, ref, computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import PokemonCard from '@/components/PokemonCard.vue';

const observerElement = ref(null);
const store = usePokemonStore();
const searchQuery = ref('');
const showFavorites = ref(false);

const filteredPokemons = computed(() => {
  if (showFavorites.value) {
    return store.favorites;
  }
  return store.pokemons;
});

const toggleFavorites = () => {
  showFavorites.value = !showFavorites.value;
};

const searchPokemons = () => {
  store.searchPokemons(searchQuery.value);
};

onMounted(() => {
  searchQuery.value = store.searchQuery;
  if (store.pokemons.size === 0) {
    store.fetchPokemons();
  }
});

onMounted(async () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        store.fetchPokemons();
      }
    },
    {
      rootMargin: '0px',
      threshold: 1.0
    }
  );

  if (observerElement.value) {
    observer.observe(observerElement.value);
  }
});
</script>

<template>
  <div>
    <v-text-field
      label="Search Pokemon"
      v-model="searchQuery"
      @input="searchPokemons"
      append-inner-icon="mdi-magnify"
      single-line
    ></v-text-field>
    <v-btn @click="toggleFavorites">Show {{ showFavorites ? 'All' : 'Favorites' }}</v-btn>
    <div class="pokemon-list">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(pokemon, id) in filteredPokemons" :key="id">
          <PokemonCard :pokemon="pokemon[1]" :pokemonId="pokemon[1].id" />
        </v-col>
      </v-row>
      <div ref="observerElement" class="observer-element"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokemon-list {
  margin: 20px;
}

.observer-element {
  height: 20px;
  margin: 20px auto;
  width: 20px;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 50%;
}
</style>
