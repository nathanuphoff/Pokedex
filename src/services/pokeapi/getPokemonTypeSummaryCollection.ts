import { PokemonTypeSummary } from '.';
import { pokemonApiClient } from './client';

export type PokemonTypeSummaryCollectionData = {
  types: Array<PokemonTypeSummary>;
};

export async function getPokemonTypeSummaryCollection(): Promise<PokemonTypeSummaryCollectionData> {
  return pokemonApiClient<PokemonTypeSummaryCollectionData>(
    `{
      types: pokemon_v2_type(where: {generation_id: {_eq: 1}}) {
        id
        name
        displayNames: pokemon_v2_typenames {
          value: name
          languageId: language_id
        }
      }
    }`,
  );
}
