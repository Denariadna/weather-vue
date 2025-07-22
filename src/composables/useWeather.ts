export async function getDailyForecast(lat: number, lon: number) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const tomorrow = new Date(now.getTime() + 86400000)
    .toISOString()
    .split("T")[0];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&start_date=${today}&end_date=${tomorrow}&timezone=auto`;

  const res = await fetch(url);
  return await res.json();
}
