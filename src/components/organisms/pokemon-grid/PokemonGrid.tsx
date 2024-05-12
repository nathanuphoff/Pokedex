import { PokemonImage } from '@/components/atoms/pokemon-image/PokemonImage';
import { Grid } from '@/components/layout/grid/Grid';
import { RoutePath } from '@/data/route-path';
import {
  PokemonCollectionParams,
  PokemonSummary,
  getPokemonSummaryCollection,
} from '@/services/pokeapi';
import colorVariables from '@/styles/pokemon-types.module.css';
import { formatApiResourceName } from '@/utils/formatting';
import { formatRoutePath } from '@/utils/router';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactElement } from 'react';
import styles from './PokemonGrid.module.css';

const pokemonGridItemWidth = 192;

type PokemonGridProps = {
  params?: PokemonCollectionParams;
};

export async function PokemonGrid({
  params,
}: PokemonGridProps): Promise<ReactElement> {
  const { pokemon } = await getPokemonSummaryCollection(params);
  return (
    <Grid columnWidth={pokemonGridItemWidth}>
      {pokemon.map((item) => {
        const name = formatApiResourceName(item.name);
        const type = item.types.at(0)?.type.name;
        return (
          <Link
            key={item.id}
            className={classNames(styles.item, type && colorVariables[type])}
            title={`View details for ${name}`}
            href={formatRoutePath(RoutePath.PokemonDetail, {
              slug: item.name,
            })}
          >
            {name}

            <div className={styles.fx}>
              <PokemonImage size='medium' pokemon={item} />
            </div>
          </Link>
        );
      })}
    </Grid>
  );
}
