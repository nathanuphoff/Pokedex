import { PokemonImage } from '@/components/atoms/pokemon-image/PokemonImage';
import { Grid } from '@/components/layout/grid/Grid';
import { RoutePath } from '@/data/route-path';
import { BasePokemonEntry } from '@/services/pokeapi';
import { formatApiResourceName } from '@/utils/formatting';
import { formatRoutePath } from '@/utils/router';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactElement } from 'react';
import styles from './PokemonGrid.module.css';
import pokemonTypeStyles from '@/styles/pokemon-types.module.css';

const pokemonGridItemWidth = 192;

type PokemonGridProps = {
  pokemon: Array<BasePokemonEntry>;
};

export function PokemonGrid({ pokemon }: PokemonGridProps): ReactElement {
  return (
    <Grid columnWidth={pokemonGridItemWidth}>
      {pokemon.map((item) => {
        const name = formatApiResourceName(item.name);
        const type = item.types.at(0)?.type.name;
        return (
          <Link
            key={item.id}
            className={classNames(styles.item, type && pokemonTypeStyles[type])}
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
