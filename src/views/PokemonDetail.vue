<script setup lang="js">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { getSprite } from '@/helpers/sprites';

const route = useRoute();
const store = usePokemonStore();

onMounted(() => {
  store.fetchPokemonDetail(parseInt(route.params.id));
  window.scrollTo(0, 0);
});
</script>

<template>
  <div v-if="store.isLoading" class="loader-container">
    <v-progress-circular color="red" indeterminate></v-progress-circular>
  </div>
  <v-container v-else-if="store.pokemonDetail" class="details-container">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-row class="text-h5 text-center" justify="end">
          <v-col class="d-flex justify-start">
            <v-icon icon="mdi-arrow-left" @click="$router.go(-1)"></v-icon>
          </v-col>
          <v-col class="d-flex justify-center" cols="4"> #{{ store.pokemonDetail.id }} </v-col>
          <v-col class="d-flex justify-end" cols="4">
            <v-btn icon @click="store.toggleFavorite(store.pokemonDetail)">
              <v-icon
                :icon="store.isFavorite(store.pokemonDetail) ? 'mdi-heart' : 'mdi-heart-outline'"
              ></v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <h3 class="text-h3 text-center">{{ store.pokemonDetail.name }}</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-img :src="getSprite(store.pokemonDetail)" aspect-ratio="1"></v-img>
        </v-row>
        <v-row align="center">
          <v-col cols="6" class="info-container">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="type in store.pokemonDetail.pokemon_v2_pokemontypes"
                :key="type.pokemon_v2_type.name"
                class="ma-2 text-center type-chip"
              >
                {{ type.pokemon_v2_type.name }}
              </v-chip>
            </div>
          </v-col>
          <v-col cols="6" class="info-container">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="ability in store.pokemonDetail.pokemon_v2_pokemonabilities"
                :key="ability.pokemon_v2_ability.name"
                class="ma-2 abilities-chip"
              >
                {{ ability.pokemon_v2_ability.name }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="stats-card">
          <v-list>
            <v-list-item
              v-for="stat in store.pokemonDetail.pokemon_v2_pokemonstats"
              :key="stat.pokemon_v2_stat.name"
            >
              <v-list-item-content>
                <v-list-item-title
                  >{{ stat.pokemon_v2_stat.name }} - {{ stat.base_stat }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.v-container {
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid #f0f0f0;
  margin-top: 50px;
  max-width: 70vw;

  @media (max-width: 960px) {
    max-width: 90vw;
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    max-width: 95vw;
    margin-top: 10px;
  }
}
.v-img {
  max-width: 200px;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
}
.stats-card {
  margin-top: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #f8f8f8;
}

.v-list-item-title,
.v-list-item-subtitle {
  text-transform: capitalize;
}

.v-chip {
  margin: 2px;
  color: white;
}

.type-chip {
  background-color: #1976d2;
}

.abilities-chip {
  background-color: #4caf50;
}

.info-container {
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-width: 250px;
}
</style>
