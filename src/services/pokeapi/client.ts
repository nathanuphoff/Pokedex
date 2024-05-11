import { createReadQueryClient } from '@/utils/graphql';

export const pokemonApiClient = createReadQueryClient(
  `https://beta.pokeapi.co/graphql/v1beta`,
);
