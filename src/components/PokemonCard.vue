<script setup lang="js">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon';
import { getSprite } from '@/helpers/sprites';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  pokemonId: {
    type: Number,
    required: true
  }
});

const router = useRouter();
const store = usePokemonStore();

const isFavorite = computed(() => store.isFavorite(props.pokemon));
const toggleFavorite = () => store.toggleFavorite(props.pokemon);

const goToPokemonDetail = () => {
  router.push({ name: 'PokemonDetail', params: { id: props.pokemonId } });
};

const sprite = computed(() => getSprite(props.pokemon));
</script>

<template>
  <v-card @click="goToPokemonDetail" class="pa-2">
    <v-img :src="sprite" class="white--text align-end">
      <v-btn icon @click.stop="toggleFavorite">
        <v-icon :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-icon>
      </v-btn>
    </v-img>
    <v-card-title>{{ props.pokemon.name }}</v-card-title>
    <v-card-text> Pokemon ID: {{ props.pokemonId }} </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}

.v-img {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  height: 200px;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
}

.v-card-title {
  z-index: 2;
}

.v-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  z-index: 3;
}

.v-card-text {
  font-size: 14px;
  color: #333;
}
</style>
