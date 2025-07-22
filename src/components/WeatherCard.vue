<template>
  <div v-if="forecast">
    <h2>{{ cityName }}</h2>
    <ul>
      <li
        v-for="(temp, index) in forecast.hourly.temperature_2m"
        :key="index"
      >
        {{ formatToLocalTime(forecast.hourly.time[index]) }}: {{ temp }}°C
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cityName: string;
  forecast: any;
}>();

function formatToLocalTime(utcString: string): string {
  return new Date(utcString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>
