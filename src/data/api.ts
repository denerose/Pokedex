import { Pokemon, PokemonLink } from "./types";

const fetchPokemonByID = async (pokemonIdOrName: string): Promise<Pokemon | null> => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }

      const result = await response.json();

      const newPokemon: Pokemon = {
        id: (result.id) ? result.id : -1,
        name: (result.name) ? result.name : '',
        types: (result.types) ? result.types : [],
        abilities: (result.abilities) ? result.abilities : [],
        moves: (result.moves) ? result.moves : [],
        height: (result.height) ? result.height : -1,
        weight: (result.weight) ? result.weight : -1,
        sprites: (result.sprites) ? result.sprites : { front_default: '', back_default: '' }
      };

      return newPokemon;

    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      return null;
    }
  };

  const fetchPokemonList = async (limit?: number, offset?: number): Promise<PokemonLink[]> => {

    // set defaults for optional params
    limit = (limit) ? limit : 100;
    offset = (offset) ? offset : 0;

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }

      const result = await response.json();

      const pokemonList: PokemonLink[] = result.results.map((item: any) => {
        return {
          name: item.name,
          url: item.url
        };
      });

      return pokemonList;

    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      return [];
    }
  };
  
  const fetchPokemonByType = async (type: string): Promise<any> => {
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Type not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokémon by type:', error);
      return null;
    }
  };

export { fetchPokemonByID, fetchPokemonList, fetchPokemonByType };