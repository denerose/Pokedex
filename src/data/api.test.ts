
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPokemonList } from './api';

describe('fetchPokemonList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch Pokémon list with default parameters', async () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchPokemonList();
    expect(result).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
  });

  it('should fetch Pokémon list with custom limit and offset', async () => {
    const mockResponse = {
      results: [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
      ],
    };


    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchPokemonList(2, 3);
    expect(result).toEqual([
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=2&offset=3');
  });

  it('should return an empty array when the API returns an error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const result = await fetchPokemonList();
    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0');
  });
});