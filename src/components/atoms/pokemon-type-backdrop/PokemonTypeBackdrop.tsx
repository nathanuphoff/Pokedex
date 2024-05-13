import { PokemonResourceIdentifier } from '@/services/pokeapi';
import colorVariables from '@/styles/pokemon-types.module.css';
import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';
import styles from './PokemonTypeBackdrop.module.css';

type PokemonTypeBackdropProps = {
  type: PokemonResourceIdentifier;
  children: ReactNode;
  className?: string;
};

export function PokemonTypeBackdrop({
  type,
  children,
  className,
}: PokemonTypeBackdropProps): ReactElement {
  return (
    <div
      className={classNames(
        styles.backdrop,
        className,
        colorVariables[type.name],
      )}
    >
      {children}
    </div>
  );
}
