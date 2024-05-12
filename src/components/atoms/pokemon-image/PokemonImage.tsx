import type { PokemonSummary } from '@/services/pokeapi';
import { formatApiResourceName } from '@/utils/formatting';
import styles from './PokemonImage.module.css';

const pokemonImageSize = 96;
const pokemonImageScaleMap = {
  small: 1,
  medium: 2,
  large: 5,
} as const;

type PokemonImageProps = {
  pokemon: Pick<PokemonSummary, 'sprites' | 'name'>;
  size?: keyof typeof pokemonImageScaleMap;
};

export async function PokemonImage({
  pokemon,
  size = 'small',
}: PokemonImageProps) {
  const src = pokemon.sprites.at(0)?.frontDefault ?? 'fallback-image-todo';
  const scale = pokemonImageScaleMap[size];
  const name = formatApiResourceName(pokemon.name);

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.image}
        src={src}
        alt={name}
        width={pokemonImageSize * scale}
        height={pokemonImageSize * scale}
      />
    </div>
  );
}
