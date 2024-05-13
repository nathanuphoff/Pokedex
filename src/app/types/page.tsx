import { Heading } from '@/components/atoms/heading/Heading';
import { PokemonTypeBackdrop } from '@/components/atoms/pokemon-type-backdrop/PokemonTypeBackdrop';
import { Grid } from '@/components/layout/grid/Grid';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { RoutePath } from '@/data/route-path';
import { getPokemonTypeSummaryCollection } from '@/services/pokeapi/getPokemonTypeSummaryCollection';
import { formatRoutePath } from '@/utils/router';
import Link from 'next/link';
import { ReactElement } from 'react';
import styles from './page.module.css';
import classNames from 'classnames';
import colorVariables from '@/styles/pokemon-types.module.css';

const englishLocaleIndex = 7; // TODO fetch locales and find locale id from there

export default async function PokemonTypesIndex(): Promise<ReactElement> {
  const { types } = await getPokemonTypeSummaryCollection();

  return (
    <>
      <PageSection as='header'>
        <Heading>Pokémon Types</Heading>
      </PageSection>

      <PageSection>
        <Grid>
          {types.map((type) => (
            <Link
              className={classNames(
                styles.link,
                colorVariables.backdrop,
                colorVariables[type.name],
              )}
              key={type.id}
              href={formatRoutePath(RoutePath.PokemonTypeDetail, {
                slug: type.name,
              })}
            >
              {type.displayNames[englishLocaleIndex].value}
            </Link>
          ))}
        </Grid>
      </PageSection>
    </>
  );
}
