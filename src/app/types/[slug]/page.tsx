import { Heading } from '@/components/atoms/heading/Heading';
import { PokemonTypeBackdrop } from '@/components/atoms/pokemon-type-backdrop/PokemonTypeBackdrop';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { PokemonGrid } from '@/components/organisms/pokemon-grid/PokemonGrid';
import { RoutePath } from '@/data/route-path';
import { findPokemonTypeSummaryByName } from '@/services/pokeapi/findPokemonTypeSummaryByName';
import { formatRoutePath } from '@/utils/router';
import Link from 'next/link';
import { ReactElement } from 'react';
import styles from './page.module.css';
import { getPokemonTypeSummaryCollection } from '@/services/pokeapi';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default async function PokemonTypeDetails({
  params,
}: PokemonDetailProps): Promise<ReactElement> {
  const type = await findPokemonTypeSummaryByName(params.slug);

  return (
    <>
      <PokemonTypeBackdrop type={type}>
        <PageSection as='header'>
          <Link
            className={styles.link}
            href={formatRoutePath(RoutePath.PokemonTypeIndex)}
          >
            Types
          </Link>

          <Heading>{type.name}</Heading>
        </PageSection>
      </PokemonTypeBackdrop>

      <PageSection>
        <PokemonGrid params={{ type: type }} />
      </PageSection>
    </>
  );
}

export async function generateStaticParams() {
  const { types } = await getPokemonTypeSummaryCollection();

  return types.map((type) => ({
    slug: type.name,
  }));
}
