<script setup lang="ts">
import { usePokeStore } from '../data/store';
import { Pokemon} from '../data/types';

const store = usePokeStore();

function handleClick(pokemon: Pokemon) {
    store.setPokemon(pokemon);
}

</script>

<template>
    <div class="container">
        <h2>Pokemon List</h2>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pokemon in store.pokemonDetailsList" :key="pokemon.name">
                    <td v-on:click="handleClick(pokemon)"><img :src="pokemon.sprites.front_default" v-alt="pokemon.name" /></td>
                    <td v-on:click="handleClick(pokemon)">{{ pokemon.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>