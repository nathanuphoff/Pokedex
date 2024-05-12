export type PokemonResourceIdentifier = {
  id: number;
  name: string;
};

// Pokémon
export type BasePokemonEntry = PokemonResourceIdentifier & {
  order: number;
  sprites: Array<PokemonSpritesEntry>;
  types: Array<{
    type: PokemonResourceIdentifier;
  }>;
};

export type PokemonSpritesEntry = {
  frontDefault: string;
};

// Pokémon types
export type PokemonTypeSummary = PokemonResourceIdentifier & {
  displayNames: Array<{
    value: string;
    languageId: number;
  }>;
};
