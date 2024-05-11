import { Heading } from '@/components/atoms/heading/Heading';
import { PokemonImage } from '@/components/atoms/pokemon-image/PokemonImage';
import { PokemonTypeTag } from '@/components/atoms/pokemon-type-tag/PokemonTypeTag';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { TagList } from '@/components/molecules/tag-list/TagList';
import { findBasePokemonByName } from '@/services/pokeapi';
import colorVariables from '@/styles/pokemon-types.module.css';
import { formatApiResourceName } from '@/utils/formatting';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import styles from './page.module.css';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default async function PokemonDetail({
  params,
}: PokemonDetailProps): Promise<ReactElement> {
  const pokemon = await findBasePokemonByName(params.slug);
  const type = pokemon.types.at(0)?.type.name;

  return (
    <div className={classNames(styles.wrapper, type && colorVariables[type])}>
      <PageSection as='header' className={styles.header}>
        <PokemonImage pokemon={pokemon} size='large' />

        <div>
          <Heading as='h2' className={styles.subheading}>
            #{pokemon.order}
          </Heading>

          <Heading>{formatApiResourceName(pokemon.name)}</Heading>
        </div>

        <TagList>
          {pokemon.types.map((item) => (
            <PokemonTypeTag key={item.type.id} type={item.type} />
          ))}
        </TagList>
      </PageSection>
    </div>
  );
}
