import { pokemonApiClient } from './client';

export const defaultPokemonCollectionLimit = 25;

export type PokemonCollectionParams = {
  limit?: number;
  offset?: number;
};

export type PokemonCollectionData = {
  pokemon: Array<PokemonCollectionItem>;
};

export async function getPokemonCollection({
  limit = defaultPokemonCollectionLimit,
  offset = 0,
}: PokemonCollectionParams = {}) {
  return pokemonApiClient<PokemonCollectionData>(`{
    pokemon: pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
      name
      order
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }`);
}

export type PokemonCollectionItem = {
  name: string;
  order: number;
  id: number;
  types: Array<{
    type: {
      name: string;
      id: number;
    };
  }>;
};
