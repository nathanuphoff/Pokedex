import type { PokemonResourceIdentifier } from '@/services/pokeapi';
import colorVariables from '@/styles/pokemon-types.module.css';
import { formatApiResourceName } from '@/utils/formatting';
import classNames from 'classnames';
import { ReactElement } from 'react';
import { Tag } from '../tag/Tag';
import styles from './PokemonTypeTag.module.css';

type PokemonTypeTagProps = {
  type: PokemonResourceIdentifier;
};

export function PokemonTypeTag({ type }: PokemonTypeTagProps): ReactElement {
  return (
    <Tag className={classNames(styles.tag, colorVariables[type.name])}>
      {formatApiResourceName(type.name)}
    </Tag>
  );
}
