import { pokemonApiClient } from './client';
import { BasePokemonEntry } from './types';

type PokemonDetailsData = {
  matches: Array<BasePokemonEntry>;
};

export async function findBasePokemonByName(
  name: string,
): Promise<BasePokemonEntry> {
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
      sprites: pokemon_v2_pokemonsprites {
        frontDefault: sprites(path: "front_default")
      }
    }
  }`);

  const [pokemonByName] = matches;

  if (!pokemonByName) {
    throw new ReferenceError(`Pokemon not found`);
  }

  return pokemonByName;
}
