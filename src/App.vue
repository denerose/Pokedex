<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import { usePokeStore } from './data/store';

  const store = usePokeStore();

  if (store.$state.pokeList.length === 0) {
    store.updatePokeList();
  }

  const pokeList = store.pokeList;

</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <div class="card">
    <h2>Pokemon List</h2>
    <ul>
      <li v-for="poke in pokeList" :key="poke.name">{{ poke.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
