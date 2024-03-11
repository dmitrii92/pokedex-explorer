import { defineStore } from 'pinia';
import { fetchPokemonDetail, fetchPokemons } from '@/api/pokemonApi';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: new Map(),
    favoritesIds: [],
    favorites: new Map(),
    pokemonDetail: null,
    isLoading: true,
    limit: 20,
    offset: 0,
    searchQuery: ''
  }),
  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      try {
        const newPokemons = await fetchPokemons(this.limit, this.offset, this.searchQuery);
        newPokemons.forEach((pokemon) => {
          this.pokemons.set(pokemon.id, pokemon);
          if (this.favoritesIds.includes(pokemon.id)) {
            this.favorites.set(pokemon.id, pokemon);
          }
        });
        this.offset += this.limit;
      } finally {
        this.isLoading = false;
      }
    },
    async searchPokemons(name) {
      this.isLoading = true;
      try {
        this.offset = 0;
        const newPokemons = await fetchPokemons(this.limit, 0, name);
        this.searchQuery = name;
        this.pokemons.clear();
        this.favorites.clear();
        newPokemons.forEach((pokemon) => {
          this.pokemons.set(pokemon.id, pokemon);
          if (this.favoritesIds.includes(pokemon.id)) {
            this.favorites.set(pokemon.id, pokemon);
          }
        });
      } catch (error) {
        console.error('Error searching pokemons', error);
        //TODO: ?
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPokemonDetail(id) {
      this.isLoading = true;
      try {
        this.pokemonDetail = await fetchPokemonDetail(id);
      } catch (error) {
        console.error('Error fetching pokemon detail', error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleFavorite(pokemon) {
      const index = this.favoritesIds.indexOf(pokemon.id);
      if (index > -1) {
        this.favoritesIds.splice(index, 1);
        this.favorites.delete(pokemon.id);
      } else {
        this.favoritesIds.push(pokemon.id);
        this.favorites.set(pokemon.id, pokemon);
      }
    },
    isFavorite(pokemon) {
      return this.favoritesIds ? this.favoritesIds.includes(pokemon.id) : false;
    },
    toggleFavorites() {
      this.favoritesIds = [];
    }
  },
  persist: {
    paths: ['favoritesIds']
  }
});
