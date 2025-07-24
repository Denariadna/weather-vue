<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <input v-model="searchQuery"
type="text" placeholder="Enter city name" class="search-input"
/>
    <input
    v-model="startDate"
    type="date"
    class="date-input"
  />
    <button type="submit"
class="search-button"
>
Search
</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'search', searchQuery: string, startDate: string): void;
}>();

const searchQuery = ref('');
const startDate = ref('');

function handleSubmit() {
  if (searchQuery.value.trim() && startDate.value) {
    emit('search', searchQuery.value.trim(), startDate.value);
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  width: 100%;
  max-width: 500px;
  gap: 0.5rem;
  margin: auto;
}

.search-input {
  flex: 1;
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #2a2a2a;
  color: #fff;
  transition: border 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #00bcd4;
}

.search-button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #00bcd4;
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-button:hover {
  background-color: #00acc1;
}

.date-input {
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #2a2a2a;
  color: #fff;
}

.date-input:hover{
  cursor: pointer;
}
</style>
