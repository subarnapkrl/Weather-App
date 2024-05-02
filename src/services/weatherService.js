

    export const getLocation=async (searchParams)=>{
        const locationApi=`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchParams}&format=json&apiKey=${import.meta.env.VITE_API_KEY}`

              const response= await fetch(locationApi);
              const data=await response.json()

              
        
           const latitude = data.results[0].lat;
    const longitude = data.results[0].lon;

    return { latitude, longitude };
    }
   export const getWeatherData = async (lat, long) => {
  const urlFormat = `https://api.open-meteo.com/v1/dwd-icon?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
  
  try {
    const response = await fetch(urlFormat);
    const data = await response.json();
    
return data



    
  } catch (error) {
    console.error('Error fetching weather data:', error);
   
  }
};

   

   