import { findPokemonDetailsByName } from '@/services/pokeapi';
import { ReactElement } from 'react';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default async function PokemonDetail({
  params,
}: PokemonDetailProps): Promise<ReactElement> {
  const { order, name, types } = await findPokemonDetailsByName(params.slug);
  return (
    <header>
      <h2>#{order}</h2>
      <h1>{name}</h1>

      <ul>
        {types.map((item) => (
          <li key={item.type.id}>{item.type.name}</li>
        ))}
      </ul>
    </header>
  );
}
