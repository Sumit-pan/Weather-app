
import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/Weatherapp";
import  "./App.css";
interface Weather {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "7b71ed561a333e74881008e4a2747aa5";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await axios.get<Weather>(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("City not found");
        setWeather(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
    } else {
      setError("");
    }
  };

  return (
    <div className="App">
      <h1 className="app_heading">Weather App</h1>
      <form className="app_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div className="app_error">{error}</div>}
      {weather && (
        <WeatherCard
          city={weather.name}
          country={weather.sys.country}
          description={weather.weather[0].description}
          temperature={weather.main.temp}
          feelsLike={weather.main.feels_like}
          humidity={weather.main.humidity}
          pressure={weather.main.pressure}
          icon={weather.weather[0].icon}
        />
      )}
    </div>
  );
}

export default App;
