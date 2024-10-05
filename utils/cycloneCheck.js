export const checkForCyclone = (weatherData) => {
    const windSpeedThreshold = 63; // km/h
    const pressureThreshold = 1000; // hPa

    const windSpeed = weatherData.wind.speed * 3.6; // Convert from m/s to km/h
    const pressure = weatherData.main.pressure;

    let cycloneDetected = false;

    if (windSpeed >= windSpeedThreshold && pressure < pressureThreshold) {
        cycloneDetected = true;
    }

    return {
        windSpeed,
        pressure,
        cycloneDetected,
    };
};
