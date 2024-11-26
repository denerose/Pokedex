import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokeStore } from './store';
import { fetchPokemonList } from './api';
import { Pokemon } from './types';

vi.mock('./api');

describe('usePokeStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.resetAllMocks();
    });

    it('should set the pokemon correctly', () => {
        const store = usePokeStore();
        const mockPokemon: Pokemon = { 
            id: 1, name: 'bulbasaur', 
            types: [], abilities: [], 
            moves: [], 
            height: 7, 
            weight: 69, 
            sprites: { front_default: '', back_default: '' } 
        };

        store.setPokemon(mockPokemon);

        expect(store.pokemon).toEqual(mockPokemon);
    });

    it('should update the pokeList correctly', async () => {
        const store = usePokeStore();
        const mockPokeList = [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ];

        (fetchPokemonList as vi.Mock).mockResolvedValue(mockPokeList);

        await store.updatePokeList();

        expect(store.pokeList).toEqual(mockPokeList);
        expect(fetchPokemonList).toHaveBeenCalled();
    });

    it('should handle fetchPokemonList error', async () => {
        const store = usePokeStore();

        (fetchPokemonList as vi.Mock).mockRejectedValue(new Error('API Error'));

        await store.updatePokeList();

        expect(store.pokeList).toEqual([]);
        expect(fetchPokemonList).toHaveBeenCalled();
    });
});