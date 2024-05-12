import { pokemonApiClient } from './client';
import type { PokemonSummaryEntry } from './types';

type PokemonSummaryData = {
  matches: Array<PokemonSummaryEntry>;
};

export async function findPokemonSummaryByName(
  name: string,
): Promise<PokemonSummaryEntry> {
  const { matches = [] } = await pokemonApiClient<PokemonSummaryData>(`{
    matches: pokemon_v2_pokemon(limit: 1, where: {name: {_eq: ${name}}}) {
      id
      name
      weight
      height
    }
  }`);

  const [pokemonByName] = matches;

  if (!pokemonByName) {
    throw new ReferenceError(`Pokemon not found`);
  }

  return pokemonByName;
}
