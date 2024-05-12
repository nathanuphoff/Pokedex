import { Heading } from '@/components/atoms/heading/Heading';
import { PokemonImage } from '@/components/atoms/pokemon-image/PokemonImage';
import { PokemonTypeTag } from '@/components/atoms/pokemon-type-tag/PokemonTypeTag';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { TagList } from '@/components/molecules/tag-list/TagList';
import colorVariables from '@/styles/pokemon-types.module.css';
import { formatApiResourceName } from '@/utils/formatting';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { formatRoutePath } from '@/utils/router';
import { RoutePath } from '@/data/route-path';
import { findPokemonSummaryByName } from '@/services/pokeapi';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default async function PokemonDetail({
  params,
}: PokemonDetailProps): Promise<ReactElement> {
  const pokemon = await findPokemonSummaryByName(params.slug);
  const type = pokemon.types.at(0)?.type.name;

  return (
    <>
      <div className={classNames(styles.wrapper, type && colorVariables[type])}>
        <PageSection as='header' className={styles.header}>
          <PokemonImage pokemon={pokemon} size='large' />

          <div>
            <Heading as='h2' variant='h4' className={styles.subheading}>
              #{pokemon.order}
            </Heading>

            <Heading>{formatApiResourceName(pokemon.name)}</Heading>
          </div>

          <TagList>
            {pokemon.types.map((item) => (
              <Link
                key={item.type.id}
                href={formatRoutePath(RoutePath.PokemonTypeDetail, {
                  slug: item.type.name,
                })}
              >
                <PokemonTypeTag type={item.type} />
              </Link>
            ))}
          </TagList>
        </PageSection>
      </div>

      <PageSection>
        <Heading variant='h3'>Stats</Heading>
        <p>Coming soon&trade;</p>
      </PageSection>
    </>
  );
}
