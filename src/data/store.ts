import { defineStore } from 'pinia'
import { Pokemon, PokemonLink } from './types';
import { ref } from 'vue';
import { fetchPokemonList } from './api';

export const usePokeStore = defineStore('pokemon', () => {

    const pokemon = ref<Pokemon | null>(null);
    const pokeList = ref<PokemonLink[]>([]);

    function setPokemon(value: Pokemon) {
        pokemon.value = value;
    }

    function updatePokeList() {
        fetchPokemonList().then((list) => {
            pokeList.value = list;
        });
    }

    return {
        pokemon,
        pokeList,
        setPokemon,
        updatePokeList
    };
    
});