import { Heading } from '@/components/atoms/heading/Heading';
import { Grid } from '@/components/layout/grid/Grid';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { RoutePath } from '@/data/route-path';
import { getPokemonTypeSummaryCollection } from '@/services/pokeapi/getPokemonTypeSummaryCollection';
import { formatRoutePath } from '@/utils/router';
import Link from 'next/link';
import { ReactElement } from 'react';

const englishLocaleIndex = 7;

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
            <>
              <Link
                href={formatRoutePath(RoutePath.PokemonTypeDetail, {
                  slug: type.name,
                })}
              >
                {type.displayNames[englishLocaleIndex].value}
              </Link>
            </>
          ))}
        </Grid>
      </PageSection>
    </>
  );
}
