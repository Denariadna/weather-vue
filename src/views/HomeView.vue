<template>
  <h1>Weather App</h1>
  <SearchBar @search="handleSearch" />
  <WeatherCard v-if="weather && city?.name"
:forecast="weather" :key="city?.name" :city-name="city?.name" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { searchLocation } from '@/composables/useGeocoding';
import { getDailyForecast } from '@/composables/useWeather';
import type { City, WeatherForecast } from '@/types/weather';

const city = ref<City | null>(null);
const weather = ref<WeatherForecast | null>(null);

async function handleSearch(name: string) {
  city.value = await searchLocation(name);
  if (city.value) {
    weather.value = await getDailyForecast(city.value.latitude, city.value.longitude);
  }
}
</script>
