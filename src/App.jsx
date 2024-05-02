import { useEffect, useState } from 'react';
import Forecast from './components/Forecast';
import Input from './components/Input';
import Weather from './components/Weather';
import { getLocation, getWeatherData } from './services/weatherService';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');

  document.title="Weather App"

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { latitude, longitude } = await getLocation('Pokhara');
        const data = await getWeatherData(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const handleSearch = async (searchTerm) => {
    try {
      const { latitude, longitude } = await getLocation(searchTerm);
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleUnitChange = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'
    );
  };

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-slate-300 '>
      
      <Input
        onSearch={handleSearch}
        humidity={weatherData?.current?.relative_humidity_2m}
        windSpeed={weatherData?.current?.wind_speed_10m}
      />
      <Weather
        data={weatherData}
        temperatureUnit={temperatureUnit} 
      />
      <Forecast data={weatherData}
        temperatureUnit={temperatureUnit}      
      />
      <div className='mt-5 text-center flex items-center justify-center  pointer '>
        <button className='border-2 p-2 hover:border-zinc-900' onClick={handleUnitChange}>
          {temperatureUnit === 'Celsius' ? '°Fahrenheit' : '°Celsius'}
        </button>
      </div>
    </div>
  );
}

export default App;
