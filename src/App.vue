<script setup lang="ts">
import PokeCard from './components/PokeCard.vue';
import PokeList from './components/PokeList.vue';
import { usePokeStore } from './data/store'

  const store = usePokeStore();

  if (store.pokeList.length === 0) {
    store.updatePokeList();
  }

  const pokeList = store.pokeList;

</script>

<template>
  <h1>Pokedex</h1>
  <PokeCard />
  <PokeList />
</template>

<style scoped>
  
</style>
