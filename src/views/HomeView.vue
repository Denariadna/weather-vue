<template>
  <div class="app-container">
    <h1 class="title">Weather App</h1>
    <SearchBar @search="handleSearch" />

    <WeatherCard
      v-if="city && forecast"
      :forecast="forecast"
      :city-name="city.name"
      :key="city.name"
    />

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { searchLocation } from '@/composables/useGeocoding';
import { getDailyForecast } from '@/composables/useWeather';
import type { City, WeatherForecast } from '@/types/weather';

const city = ref<City | null>(null);
const forecast = ref<WeatherForecast | null>(null);
const error = ref<string | null>(null);

const { fetchWeather } = getDailyForecast();

async function handleSearch(name: string) {
  error.value = null;
  forecast.value = null;

  try {
    const location = await searchLocation(name);
    if (!location) {
      error.value = 'City not found';
      return;
    }
    city.value = location;

    const data = await fetchWeather(location.latitude, location.longitude);
    forecast.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unexpected error';
  }
}
</script>

<style scoped>
.app-container {
  text-align: center;
  margin-top: 50px;
  color: white;
}
.title {
  font-size: 3rem;
  margin-bottom: 20px;
}
.error {
  margin-top: 20px;
  color: red;
}
</style>
