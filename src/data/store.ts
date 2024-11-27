import { defineStore } from 'pinia'
import { Pokemon, PokemonLink } from './types';
import { ref } from 'vue';
import { fetchPokemonList, fetchPokemonByURL } from './api';

export const usePokeStore = defineStore('pokemon', () => {

    const pokemon = ref<Pokemon | null>(null);
    const pokeList = ref<PokemonLink[]>([]);
    const pokemonDetailsList = ref<Pokemon[]>([]);

    const page = ref<number>(1);
    const totalPages = ref<number>(1);

    function setPokemon(value: Pokemon): void {
        pokemon.value = value;
    }

    function setPokemonByName(name: string): void {
        const foundPokemon = findPokemonByName(name);
        if (foundPokemon) {
            pokemon.value = foundPokemon;
        }
    }

    function updatePokeStore(): void {
        fetchPokemonList().then((list) => {
            pokeList.value = list;
            list.forEach((pokemonItem) => {
                fetchPokemonByURL(pokemonItem.url).then((newPokemon: Pokemon) => {
                    if (newPokemon && newPokemon.id != -1) { 
                        pokemonDetailsList.value.push(newPokemon);
                    }
                });
            });
            if (pokemon.value === null && pokemonDetailsList.value.length > 0) {
                pokemon.value = pokemonDetailsList.value[0];
            }
            if (pokemonDetailsList.value.length > 0) {
                totalPages.value = Math.ceil(pokemonDetailsList.value.length / 10);
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
        updatePokeStore,
        findPokemonByName,
    };
    
});
