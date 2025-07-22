<template>
  <SearchBar @search="handleSearch" />
  <WeatherCard v-if="weather" :forecast="weather" :cityName="city?.name" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { searchLocation } from '@/composables/useGeocoding';
import { getDailyForecast } from '@/composables/useWeather';

const city = ref<any>(null);
const weather = ref<any>(null);

async function handleSearch(name: string) {
  city.value = await searchLocation(name);
  if (city.value) {
    weather.value = await getDailyForecast(city.value.latitude, city.value.longitude);
  }
}
</script>
