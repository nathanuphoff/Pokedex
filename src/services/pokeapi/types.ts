export type BasePokemonEntry = {
  id: number;
  name: string;
  order: number;
  sprites: Array<PokemonSpritesEntry>;
  types: Array<{
    type: BasePokemonTypeEntry;
  }>;
};

export type PokemonSpritesEntry = {
  frontDefault: string;
};

export type BasePokemonTypeEntry = {
  id: string;
  name: string;
};
