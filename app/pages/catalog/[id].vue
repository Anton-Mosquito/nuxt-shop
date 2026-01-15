<script setup lang="ts">
const route = useRoute();
console.log(route.params.id);
const id = ref(route.params.id);
</script>

<template>
  <div>
    <h1>Dynamic path {{ id }}</h1>
  </div>
</template>
