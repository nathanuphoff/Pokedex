export type PokemonResourceIdentifier = {
  id: number;
  name: string;
};

// Pokémon
export type PokemonSummary = PokemonResourceIdentifier & {
  order: number;
  sprites: Array<PokemonSpriteImages>;
  types: Array<{
    type: PokemonResourceIdentifier;
  }>;
};

export type PokemonSpriteImages = {
  frontDefault: string;
};

// Pokémon types
export type PokemonTypeSummary = PokemonResourceIdentifier & {
  displayNames: Array<{
    value: string;
    languageId: number;
  }>;
};
