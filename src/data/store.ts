import { defineStore } from 'pinia'
import { Pokemon, PokemonLink } from './types';
import { ref } from 'vue';
import { fetchPokemonList, fetchPokemonByURL } from './api';

export const usePokeStore = defineStore('pokemon', () => {

    const pokemon = ref<Pokemon | null>(null);
    const pokeList = ref<PokemonLink[]>([]);
    const pokemonDetailsList = ref<Pokemon[]>([]);

    function setPokemon(value: Pokemon): void {
        pokemon.value = value;
    }

    function setPokemonByName(name: string): void {
        const foundPokemon = findPokemonByName(name);
        if (foundPokemon) {
            pokemon.value = foundPokemon;
        }
    }

    function updatePokeList(): void {
        fetchPokemonList().then((list) => {
            pokeList.value = list;
            list.forEach((pokemon) => {
                fetchPokemonByURL(pokemon.url).then((details: Pokemon) => {
                    if (details && details.id != -1) { 
                        pokemonDetailsList.value.push(details);
                    }
                });
            });
            if (pokemon.value === null && pokemonDetailsList.value.length > 0) {
                pokemon.value = pokemonDetailsList.value[0];
            }
        });
    }

    function findPokemonByName(name: string): Pokemon | null {
        return pokemonDetailsList.value.find((pokemon) => pokemon.name === name) || null;
    }

    return {
        pokemon,
        pokeList,
        pokemonDetailsList,
        setPokemon,
        updatePokeList,
        findPokemonByName,
    };
    
});
