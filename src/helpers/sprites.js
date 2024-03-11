export const getSprite = (pokemon) => {
  if (
    pokemon.pokemon_v2_pokemonsprites.length > 0 &&
    pokemon.pokemon_v2_pokemonsprites[0].sprites
  ) {
    return pokemon.pokemon_v2_pokemonsprites[0].sprites.other['official-artwork'].front_default;
  }
  return null;
};
