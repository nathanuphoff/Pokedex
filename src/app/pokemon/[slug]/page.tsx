import { ReactElement } from 'react';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default function PokemonDetail({
  params,
}: PokemonDetailProps): ReactElement {
  return <>PokemonDetail: {params.slug}</>;
}
