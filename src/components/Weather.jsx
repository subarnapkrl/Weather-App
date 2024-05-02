import Lottie from 'lottie-react';

import Sunny from '../json/Sunny.json';
import night from '../json/night.json';
import Windy from '../json/Windy.json';
import Rainy2 from '../json/Rainy2.json'
import Cloudy from '../json/Cloudy.json'

const getWeatherIcon = (isDay, humidity, windSpeed, temperature) => {

  if (isDay === 1 && temperature > 20 && humidity < 50 && windSpeed < 10) {
    return Sunny;
  }else if(isDay===""){
    return Sunny;
  }else if(temperature<20 && humidity >50 && windSpeed>20){
    return Rainy2;
  }else if(temperature<20 && humidity>50 || windSpeed>10){
      return Cloudy;
  }
   else if (isDay === 0) {
    return night;
  } else if (temperature<20 && windSpeed > 20) {
    return Windy;
  } else {
    return Sunny; 
  }
};

const Weather = ({ data, temperatureUnit }) => {
  // Check if data is available
  if (!data) {
    return <div>Loading...</div>; 
  }

  
  const { daily, current } = data;
  const temperature = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const humidity = current.relative_humidity_2m;
  const isDay = current.is_day;

  const weatherIcon = getWeatherIcon(isDay, humidity, windSpeed, temperature);

  const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const convertTemperature = (temperature) => {
    if (temperatureUnit === 'Fahrenheit') {
      return convertToFahrenheit(temperature);
    }
    return temperature;
  };

  const convertedTemperature = convertTemperature(temperature);

  const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateParts = dateString.split('-');

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[2]);

    const dayIndex = new Date(year, month, day).getDay();
    
    return days[dayIndex];
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-3 text-xl">
      
      <Lottie animationData={weatherIcon} style={{ height: 100 }} />
      <div className='flex flex-col items-center justify-between mt-5'>

        <p className='text-5xl font-extrabold mb-2'>{convertedTemperature}</p>
        <p>{daily.temperature_2m_min[2]} / {daily.temperature_2m_max[2]}</p>
        <p className='text-sm mt-4'>{getDayOfWeek(current.time)}</p>
      </div>
      <div className='flex flex-col space-y-4 items-center justify-center mt-5'>
        <div className='flex font-light text-sm items-center justify-center space-x-3'>
          <img src="/icons/wind.png" style={{ height: '25%', width: '25%' }} alt="Windy" />
          <span className='font-medium'>{current.wind_speed_10m} mp/h</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center space-x-3'>
          <img src="/icons/umbrella.png" style={{ height: '25%', width: '25%' }} alt="Humidity Level" />
          <span className='font-medium'>{current.relative_humidity_2m} %</span>
        </div>
        <div className='flex font-light text-sm items-center justify-center space-x-3'>
          <img src="/icons/rain.png" style={{ height: '25%', width: '25%' }} alt="Rain fall level" />
          <span className='font-medium'>{current.rain}mm</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
