import { BasePokemonEntry } from '.';
import { pokemonApiClient } from './client';

export const defaultPokemonCollectionLimit = 151;

export type PokemonCollectionParams = {
  limit?: number;
  offset?: number;
};

export type PokemonCollectionData = {
  pokemon: Array<BasePokemonEntry>;
};

export async function getBasePokemonCollection({
  limit = defaultPokemonCollectionLimit,
  offset = 0,
}: PokemonCollectionParams = {}) {
  return pokemonApiClient<PokemonCollectionData>(`{
    pokemon: pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
      id
      name
      order
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
      sprites: pokemon_v2_pokemonsprites {
        frontDefault: sprites(path: "front_default")
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
