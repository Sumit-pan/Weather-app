
import React from "react";

interface WeatherCardProps {
  city: string;
  country: string;
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  country,
  description,
  temperature,
  feelsLike,
  humidity,
  pressure,
  icon,
}) => {
  return (
    <div>
      <h2>
        {city}, {country}
      </h2>
      <p>Current Weather: {description}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Feels Like: {feelsLike}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Pressure: {pressure} hPa</p>
      <img
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt="Weather Icon"
      />
    </div>
  );
};

export default WeatherCard;
