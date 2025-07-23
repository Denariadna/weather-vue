import type { WeatherForecast } from '@/types/weather';
import { ref } from 'vue';

export function getDailyForecast() {
  const forecast = ref<WeatherForecast | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  async function fetchWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherForecast | null> {
    error.value = null;
    isLoading.value = true;
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`
      );
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      forecast.value = data;
      return data;
    } catch (err) {
      forecast.value = null;
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Unexpected error';
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return { forecast, fetchWeather, error, isLoading };
}
