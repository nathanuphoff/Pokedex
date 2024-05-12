import { PokemonTypeSummary } from '.';
import { pokemonApiClient } from './client';
import { pokemonFirstGenerationId } from './constants';

export type PokemonTypeSummaryCollectionData = {
  types: Array<PokemonTypeSummary>;
};

export async function getPokemonTypeSummaryCollection(): Promise<PokemonTypeSummaryCollectionData> {
  return pokemonApiClient<PokemonTypeSummaryCollectionData>(
    `{
      types: pokemon_v2_type(where: {generation_id: {_eq: ${pokemonFirstGenerationId}}}) {
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
