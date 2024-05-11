import { pokemonApiClient } from './client';

type PokemonDetailsData = {
  matches: Array<PokemonDetailsEntry>;
};

export type PokemonDetailsEntry = {
  id: string;
  name: string;
  order: number;
  types: Array<{
    type: {
      id: string;
      name: string;
    };
  }>;
};

export async function findPokemonDetailsByName(
  name: string,
): Promise<PokemonDetailsEntry> {
  const { matches } = await pokemonApiClient<PokemonDetailsData>(`{
    matches: pokemon_v2_pokemon(limit: 1, where: {name: {_eq: ${name}}}) {
      id
      name
      order
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
    }
  }`);

  console.log('x', matches);

  const [pokemonByName] = matches;

  if (!pokemonByName) {
    throw new ReferenceError(`Pokemon not found`);
  }

  return pokemonByName;
}
