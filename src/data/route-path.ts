// Enum values must represent routes in app directory
export enum RoutePath {
  Index = '/',
  PokemonIndex = '/pokemon',
  PokemonDetail = '/pokemon/[slug]',
  PokemonTypeIndex = '/types',
  PokemonTypeDetail = '/types/[slug]',
}
