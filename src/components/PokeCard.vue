<script setup lang="ts">
import { usePokeStore } from '../data/store';

const store = usePokeStore();



</script>

<template>
    <div v-if="store.pokemon" class="card">
        <h2>{{ store.pokemon.name }}</h2>
        <img :src="`src/assets/sprites/${store.pokemon.id}.svg`" :alt="store.pokemon.name" />
        <p>Height: {{ store.pokemon.height }}</p>
        <p>Weight: {{ store.pokemon.weight }}</p>
        <p>Type(s):
            <span v-for="type in store.pokemon.types" :key="type.slot">
                    {{ type.type.name + " "}} 
            </span>
        </p>
    </div>
</template>