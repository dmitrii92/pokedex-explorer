import apolloClient from '@/apollo-client';
import { gql } from '@apollo/client/core';

export const fetchPokemons = async (limit, offset, name) => {
  console.log('fetchPokemons', limit, offset, name);
  const GET_POKEMONS = gql`
    query samplePokeAPIquery($offset: Int, $limit: Int, $name: String) {
      pokemon_v2_pokemon(offset: $offset, limit: $limit, where: { name: { _ilike: $name } }) {
        id
        name
        pokemon_v2_pokemonsprites(order_by: { id: asc }) {
          pokemon_id
          sprites
          id
        }
      }
    }
  `;
  const nameFilter = name ? `%${name}%` : '%';

  const { data } = await apolloClient.query({
    query: GET_POKEMONS,
    variables: { limit, offset, name: nameFilter }
  });

  return data.pokemon_v2_pokemon;
};

export const fetchPokemonDetail = async (id) => {
  const GET_POKEMON_DETAILS = gql`
    query GetPokemonDetails($id: Int!) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        id
        name
        weight
        height
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonabilities {
          pokemon_v2_ability {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
    }
  `;
  const response = await apolloClient.query({
    query: GET_POKEMON_DETAILS,
    variables: { id }
  });
  return response.data.pokemon_v2_pokemon.length > 0 ? response.data.pokemon_v2_pokemon[0] : null;
};
