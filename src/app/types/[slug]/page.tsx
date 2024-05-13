import { Heading } from '@/components/atoms/heading/Heading';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { findPokemonTypeSummaryByName } from '@/services/pokeapi/findPokemonTypeSummaryByName';
import colorVariables from '@/styles/pokemon-types.module.css';
import classNames from 'classnames';
import { ReactElement } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { formatRoutePath } from '@/utils/router';
import { RoutePath } from '@/data/route-path';
import { PokemonGrid } from '@/components/organisms/pokemon-grid/PokemonGrid';
import { PokemonTypeBackdrop } from '@/components/atoms/pokemon-type-backdrop/PokemonTypeBackdrop';

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
