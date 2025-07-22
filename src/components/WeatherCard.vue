<template>
  <div v-if="forecast" class="weather-card">
    <h2 class="city-name">
      {{ cityName }}
    </h2>

    <div class="chart-wrapper">
      <ForecastChart
        :labels="forecast.hourly.time.slice(0, 24).map(formatToLocalTime)"
        :temperatures="forecast.hourly.temperature_2m.slice(0, 24)"
      />
    </div>

    <ul class="forecast-list">
      <li v-for="(temp, index) in forecast.hourly.temperature_2m.slice(0, 24)" :key="index">
        <span class="time">
          {{
            new Date(forecast.hourly.time[index]).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </span>
        <span class="temp">{{ temp }}°C</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ForecastChart from '@/components/TemperatureChart.vue';

defineProps<{
  cityName: string;
  forecast: {
    hourly: {
      temperature_2m: number[];
      time: string[];
    };
    hourly_units: {
      temperature_2m: string;
      time: string;
    };
    latitude: number;
    longitude: number;
    timezone: string;
  };
}>();

function formatToLocalTime(utcString: string): string {
  return new Date(utcString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped>
.weather-card {
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  width: 700px;
  max-width: 700px;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.15);
}

.city-name {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.chart-wrapper {
  width: 100%;
  max-width: 640px;
  min-height: 300px;
  margin-bottom: 1.5rem;
  margin: auto;
}

.forecast-list {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
}

.forecast-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  font-size: 1rem;
  color: #ddd;
}

.time {
  color: #bbb;
}

.temp {
  font-weight: 500;
}
</style>
