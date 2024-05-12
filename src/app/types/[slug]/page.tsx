import { Heading } from '@/components/atoms/heading/Heading';
import { PageSection } from '@/components/layout/page-section/PageSection';
import { ReactElement } from 'react';

type PokemonDetailParams = {
  slug: string;
};

type PokemonDetailProps = {
  params: PokemonDetailParams;
};

export default async function PokemonTypeDetails({
  params,
}: PokemonDetailProps): Promise<ReactElement> {
  return (
    <PageSection as='header'>
      <Heading>{params.slug}</Heading>
    </PageSection>
  );
}
