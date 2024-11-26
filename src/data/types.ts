
// Type for the PokeType object (for types like fire, water, etc.)
export type PokeType = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };
  
  // Type for the Ability object
  export type Ability = {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  };
  
  // Type for the Move object
  export type Move = {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  };
  
  // Main Pokémon type
  export type Pokemon = {
    id: number;
    name: string;
    types: PokeType[];
    abilities: Ability[];
    moves: Move[];
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      back_default: string;
      [key: string]: string; // To support other sprite variations (like shiny)
    };
  };

  export type PokemonLink = {
    name: string;
    url: string;
  };

  export type PokemonShort = {
    name: string;
    types: PokeType[];
    sprite: string;
  };
  