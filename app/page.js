"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState('15.5'); // Default latitude
  const [lon, setLon] = useState('73.8'); // Default longitude
  const [dataType, setDataType] = useState('weather'); // Default to weather data

  useEffect(() => {
    fetchData(lat, lon, dataType); // Fetch data on component mount
  }, []);

  const fetchData = async (latitude, longitude, type) => {
    setLoading(true);
    try {
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const url = type === 'ocean'
        ? `https://api.openweathermap.org/data/2.5/marine?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        : `/api/weather?lat=${latitude}&lon=${longitude}`;

      const response = await fetch(url);
      const responseData = await response.json();
      console.log(responseData); // Log the response data

      if (responseData.error) {
        setError(responseData.error); // Handle error message from API
      } else {
        setData(responseData);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(lat, lon, dataType); // Fetch data based on user input and selected type
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value); // Update data type based on selection
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600 text-xl">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center animate__animated animate__fadeIn">Ocean/Weather Data</h1>

      {/* Data Type Selection */}
      <div className="mb-4">
        <select
          value={dataType}
          onChange={handleDataTypeChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="weather">Weather</option>
          <option value="ocean">Ocean Data</option>
        </select>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="p-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md ml-2 hover:bg-blue-600 transition duration-200">
          Search
        </button>
      </form>

      {data && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full transition transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn">
          {dataType === 'weather' ? (
            <>
              <p className="text-lg font-semibold">Location: {data.name}</p>
              <p className="text-2xl font-bold mt-2">Temperature: {data.main.temp} °C</p>
              <p className="text-lg mt-2">Wind Speed: {data.wind.speed} m/s</p>
              <p className="text-lg mt-2">Pressure: {data.main.pressure} hPa</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">Ocean Data</p>
              <p className="text-lg mt-2">Sea Surface Temperature: {data.sst || 'N/A'} °C</p>
              <p className="text-lg mt-2">Salinity: {data.salinity || 'N/A'} PSU</p>
              <p className="text-lg mt-2">Chlorophyll-a: {data.chlorophyll || 'N/A'} mg/m³</p>
              <p className="text-lg mt-2">Current Speed: {data.current?.speed || 'N/A'} m/s</p>
              <p className="text-lg mt-2">Wave Height: {data.wave?.height || 'N/A'} m</p>
            </>
          )}
        </div>
      )}
      {!data && <p className="text-lg text-gray-600">No data available</p>}
    </div>
  );
}
