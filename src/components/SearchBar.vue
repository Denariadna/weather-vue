<template>
  <div>
    <input v-model="query" placeholder="Enter city..." />
    <button @click="onSearch">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

function onSearch() {
  if (query.value.trim()) {
    emit('search', query.value.trim());
  }
}
</script>
