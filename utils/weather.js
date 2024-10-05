import axios from 'axios';

export const getWeatherData = async (latitude, longitude) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data", error);
        throw new Error("Could not fetch weather data");
    }
};
