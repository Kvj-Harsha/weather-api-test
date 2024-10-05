import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
        console.log("Requesting weather data from OpenWeatherMap API...");
        console.log(`URL: ${url}`);

        const response = await axios.get(url);

        console.log("Weather data received:", response.data);

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error fetching weather data:", error.message || error);
        return new Response(JSON.stringify({ error: "Failed to fetch weather data" }), { status: 500 });
    }
}
