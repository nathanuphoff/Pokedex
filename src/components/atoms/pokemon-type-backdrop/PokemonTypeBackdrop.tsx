import { PokemonResourceIdentifier } from '@/services/pokeapi';
import colorVariables from '@/styles/pokemon-types.module.css';
import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';
import styles from './PokemonTypeBackdrop.module.css';

const fallbackTypeName = 'normal';

type PokemonTypeBackdropTag = 'div' | 'span';

type PokemonTypeBackdropProps = {
  as?: PokemonTypeBackdropTag;
  type: PokemonResourceIdentifier | null;
  children: ReactNode;
  className?: string;
};

export function PokemonTypeBackdrop({
  as: Tag = 'div',
  type,
  children,
  className,
}: PokemonTypeBackdropProps): ReactElement {
  return (
    <Tag
      className={classNames(
        colorVariables.backdrop,
        colorVariables[type?.name ?? fallbackTypeName],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
