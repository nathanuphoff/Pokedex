import { PokemonResourceIdentifier, PokemonSummary } from '.';
import { pokemonApiClient } from './client';
import { defaultPokemonCollectionLimit } from './constants';

export type PokemonCollectionParams = {
  limit?: number;
  offset?: number;
  type?: PokemonResourceIdentifier;
};

export type BasePokemonCollectionData = {
  pokemon: Array<PokemonSummary>;
};

export async function getPokemonSummaryCollection({
  limit = defaultPokemonCollectionLimit,
  offset = 0,
  type,
}: PokemonCollectionParams = {}) {
  const whereQueryParams = [
    // Abuse id range to only get Pokémon from the 1st generation
    `id: {_gt: 0, _lte: ${defaultPokemonCollectionLimit}}`,
  ];

  if (type) {
    whereQueryParams.push(
      `pokemon_v2_pokemontypes: {pokemon_v2_type: {id: {_eq: ${type.id}}}}`,
    );
  }

  const queryParams = [
    `limit: ${limit}`,
    `offset: ${offset}`,
    `where: {${whereQueryParams}}`,
  ];

  return pokemonApiClient<BasePokemonCollectionData>(`{
    pokemon: pokemon_v2_pokemon(${queryParams}) {
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
