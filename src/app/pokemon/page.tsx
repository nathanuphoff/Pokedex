import { Heading } from '@/components/atoms/heading/Heading';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { PokemonGrid } from '@/components/organisms/pokemon-grid/PokemonGrid';
import { getBasePokemonCollection } from '@/services/pokeapi/getPokemonCollection';
import type { ReactElement } from 'react';

export default async function PokemonIndex(): Promise<ReactElement> {
  const { pokemon } = await getBasePokemonCollection();

  return (
    <>
      <PageSection as='header'>
        <Heading>Pokémon</Heading>
      </PageSection>

      <PageSection>
        <PokemonGrid pokemon={pokemon} />
      </PageSection>
    </>
  );
}
