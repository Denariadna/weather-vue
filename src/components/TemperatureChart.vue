<script setup lang="ts">
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
import type { TemperatureChartProps } from '@/types/chart';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const props = defineProps<TemperatureChartProps>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Temperature (°C)',
      data: props.temperatures,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: '#ffffff' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#ccc' },
    },
    y: {
      ticks: { color: '#ccc' },
    },
  },
};
</script>

<template>
  <Line :data="chartData"
:options="chartOptions" />
</template>
