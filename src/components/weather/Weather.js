import React, { useEffect, useState } from "react";
import Search from "../search/Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (param) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchWeather("Rewari");
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchWeather(search);
    setSearch("");
  };
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className="App">
        {error && <div>{error}</div>}
        {loading && <div className="loading">Loading....</div>}
      </div>
      {!loading && weatherData && (
        <div className="App">
          <div className="city-name">
            <h2>
              {weatherData.name}, <span>{weatherData.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData.main.temp}°C</div>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="weather-info">
            <div>
              <p className="wind">
                <span>Wind</span>
                <span>{weatherData.wind.speed} m/s</span>
              </p>
            </div>
            <div>
              <p className="humidity">
                <span>Humidity</span>
                <span>{weatherData.main.humidity}%</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
