
const Forecast = ({ data, temperatureUnit }) => {
  // Check if data is available
  if (!data) {
    return <div>Loading...</div>; 
  }

  const { daily } = data;

  const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[2]);
    const dayIndex = new Date(year, month, day).getDay();
    return days[dayIndex];
  };

  const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const convertTemperature = (temperature) => {
    if (temperatureUnit === 'Fahrenheit') {
      return convertToFahrenheit(temperature);
    }
    return temperature;
  };

  const renderTemperature = (minTemp, maxTemp) => {
    const convertedMinTemp = convertTemperature(minTemp);
    const convertedMaxTemp = convertTemperature(maxTemp);
    return `${convertedMinTemp}/${convertedMaxTemp}`;
  };

  return (
    <>
       <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-between py-3 text-xl">
        {daily.temperature_2m_min.slice(1).map((minTemp, index) => ( // Start from index 1
      <div key={index + 1} className='flex flex-col items-center justify-center gap-2 p-4 bg-gray-200 rounded-lg'>
        <p className='font-medium text-md'>{renderTemperature(minTemp, daily.temperature_2m_max[index + 1])}</p>
        <p className="font-bold text-sm">{getDayOfWeek(daily.time[index + 1])}</p>
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default Forecast;
