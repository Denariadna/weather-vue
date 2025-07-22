export async function searchLocation(name: string) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      name
    )}&count=1&language=en&format=json`
  );
  const data = await res.json();
  return data.results?.[0];
}
