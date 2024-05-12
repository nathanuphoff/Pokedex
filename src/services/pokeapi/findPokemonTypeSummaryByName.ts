import { pokemonApiClient } from './client';
import { pokemonFirstGenerationId } from './constants';
import { PokemonTypeSummary } from './types';

type PokemonDetailsData = {
  matches: Array<PokemonTypeSummary>;
};

export async function findPokemonTypeSummaryByName(
  name: string,
): Promise<PokemonTypeSummary> {
  const { matches = [] } = await pokemonApiClient<PokemonDetailsData>(`{
    matches: pokemon_v2_type(where: {generation_id: {_eq: ${pokemonFirstGenerationId}}, name: {_eq: "${name}"}}) {
      id
      name
      displayNames: pokemon_v2_typenames {
        value: name
        languageId: language_id
      }
    }
  }`);

  const [pokemonTypeByName] = matches;

  if (!pokemonTypeByName) {
    throw new ReferenceError(`Pokemon type not found`);
  }

  return pokemonTypeByName;
}
