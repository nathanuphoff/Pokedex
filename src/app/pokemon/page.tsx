import { RoutePath } from '@/data/route-path';
import { getPokemonCollection } from '@/services/pokeapi/getPokemonCollection';
import { formatRoutePath } from '@/utils/router';
import Link from 'next/link';
import { ReactElement } from 'react';

export default async function PokemonIndex(): Promise<ReactElement> {
  const { pokemon } = await getPokemonCollection();

  return (
    <>
      <ul>
        {pokemon.map((item) => {
          const name = item.name;
          return (
            <li key={item.id}>
              <Link
                title={`View details for ${name}`}
                href={formatRoutePath(RoutePath.PokemonDetail, {
                  slug: item.name,
                })}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
