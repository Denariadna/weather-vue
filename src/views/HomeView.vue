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
    <p v-if="isLoading">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { searchLocation } from '@/composables/useGeocoding';
import { getDailyForecast } from '@/composables/useWeather';
import type { City, WeatherForecast } from '@/types/weather';
import { getCookie } from '@/composables/useCookie';

const city = ref<City | null>(null);

onMounted(async () => {
  const savedCity = getCookie('last_city');
  if (savedCity) {
    const today = new Date().toISOString().split('T')[0];
    await handleSearch(savedCity, today);
  }
});

const forecast = ref<WeatherForecast | null>(null);
const { fetchWeather, isLoading, error } = getDailyForecast();

async function handleSearch(name: string, startDate: string) {
  error.value = null;
  forecast.value = null;

  try {
    const location = await searchLocation(name);
    if (!location) {
      error.value = 'City not found';
      return;
    }
    city.value = location;

    const data = await fetchWeather(location.latitude, location.longitude, startDate );
    document.cookie = `last_city=${encodeURIComponent(name)}; max-age=${60 * 60 * 24 * 7}`;
    forecast.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unexpected error';
  }
}

</script>

<style scoped>
.app-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
  min-width: 800px;
  color: white;
}

.title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.error {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
