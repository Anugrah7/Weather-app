import { useState } from 'react';
import Sun from './assets/clear.png';
import Cloud from './assets/cloud.png';
import Snow from './assets/snowMain.png';
import Background from './assets/background.jpg'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        console.log(data);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }
  };

  const getIcons = (temp) => {
    if (temp > 30) {
      return Sun;
    } else if (temp < 30 && temp > 15) {
      return Cloud;
    } else {
      return Snow;
    }
  };

  return (

    <div className="flex flex-col items-center justify-center h-screen" >
     <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)', // Blurring the background image
        }}
      ></div>
      <h1 className=" relative text-6xl font-bold bg-gradient-to-tr from-amber-300 via-amber-500 to-zinc-200 bg-clip-text text-transparent mb-8">Weather App</h1>

      {/* Input field and button container */}
      <div className=" relative flex items-center space-x-3 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          className="p-3 rounded-lg border-none text-lg text-gray-700 shadow-lg focus:outline-none"
        />
        <button
          style={{ color: 'white' }}
          className="bg-black rounded p-4"
          onClick={fetchWeather}
        >
          Submit
        </button>
      </div>

      {/* Weather display */}
      {error && <p>{error}</p>}
      {weather && (
        <div className="relative m-3 bg-transparent p-6 rounded-xl shadow-2xl text-center">
          <div className="flex justify-center items-center space-x-6">
            <img
              src={getIcons(weather.main.temp)}
              alt="Weather Icon"
              className="w-72 h-66 images"
            />
            <div className="text-left">
              <h1 className="font-bold text-4xl bg-gradient-to-tr from-amber-300 via-amber-500 to-zinc-500 bg-clip-text text-transparent">{weather.main.temp}°C</h1>
              <p className="font-bold text-2xl text-slate-200">{weather.name}</p>
              
            </div>
          </div>
          <div className='flex justify-center items-center space-x-2'>
  <i className="fa-solid fa-wind text-white"></i>
  <h1 className="font-bold text-xl bg-gradient-to-tr from-zinc-50 via-gray-200 to-yellow-400 bg-clip-text text-transparent">Wind Speed: {weather.wind.speed} m/s</h1>
  <div className='flex justify-center items-center space-x-2 '>
              <i class="fa-solid fa-water text-white"></i>
              <h1 className="font-bold text-xl bg-gradient-to-tr from-zinc-50 via-gray-200 to-yellow-400 bg-clip-text text-transparent">Humidity: {weather.main.humidity}%</h1>
              </div>
</div>

        </div>
      )}
    </div>
  );
}

export default App;
