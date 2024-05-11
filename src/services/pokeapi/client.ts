import { createReadQuery } from '@/utils/graphql';

export const pokemonApiClient = createReadQuery(
  `https://beta.pokeapi.co/graphql/v1beta`,
);
