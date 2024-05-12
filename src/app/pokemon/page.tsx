import { Heading } from '@/components/atoms/heading/Heading';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { PokemonGrid } from '@/components/organisms/pokemon-grid/PokemonGrid';
import type { ReactElement } from 'react';

const firstGenPokemonCount = 151;

export default async function PokemonIndex(): Promise<ReactElement> {
  return (
    <>
      <PageSection as='header'>
        <Heading>Pokémon</Heading>
      </PageSection>

      <PageSection>
        <PokemonGrid params={{ limit: firstGenPokemonCount }} />
      </PageSection>
    </>
  );
}
