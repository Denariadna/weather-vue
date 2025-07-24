<template>
  <div v-if="forecast" class="weather-card">
    <h2 class="city-name">
      {{ cityName }}
    </h2>
    <h3 class="city-date">
      {{ formatDateToDMY(forecast.hourly.time[0]) }}
    </h3>
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

function formatDateToDMY(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

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
  width: 90%;
  min-width: 600px;
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.15);
  margin: auto;
}

.city-name {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.date {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  color: #aaa;
  margin-top: 0.3rem;
}

.chart-wrapper {
  width: 70%;
  max-width: 700px;
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

@media (max-width: 800px) {
  .weather-card {
    max-width: 400px;
  }
  .city-name {
    font-size: 1.4rem;
  }

  .city-date{
    font-size: 1.2rem;
  }

  .forecast-list li {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }

  .chart-wrapper{
    max-width: 400px;
    min-height: 200px;
  }
}

</style>
