import type { WeatherForecast } from '@/types/weather';
import { ref } from 'vue';

export function getDailyForecast() {
  const forecast = ref<WeatherForecast | null>(null);
  const error = ref<string | null>(null);

  async function fetchWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherForecast | null> {
    error.value = null;
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`
      );
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      forecast.value = data;
      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unexpected error';
      forecast.value = null;
      return null;
    }
  }

  return { forecast, fetchWeather, error };
}
