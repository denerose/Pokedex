import { defineStore } from 'pinia'
import { Pokemon, PokemonShort } from './types';
import { ref } from 'vue';

export const useCounterStore = defineStore('pokemon', () => {

    const pokemon = ref<Pokemon | null>(null);
    const pokeList = ref<PokemonShort[]>([]);

    function setPokemon(value: Pokemon) {
        pokemon.value = value;
    }

    return {
        pokemon,
        pokeList,
        setPokemon
    };
    
});