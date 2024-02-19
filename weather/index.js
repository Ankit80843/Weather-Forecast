// index.js

document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.input_bar');
    const searchBtn = document.querySelector('#ser_button');
    const weatherImg = document.querySelector('.w_image');
    const temp = document.querySelector('.Temp');
    const description = document.querySelector('.discri');
    const humidity = document.querySelector('.humidity_per');
    const windSpeed = document.querySelector('.wind_speed');

    searchBtn.addEventListener('click', function() {
        const city = inputBox.value.trim();
        if (city !== '') {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        const apiKey = '89329af22d085a253ed48708544c83ce';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                updateWeather(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
           
        }
    }
  
    function updateWeather(data) {
        temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;

        switch (data.weather[0].main) {
            case 'Clouds':
                weatherImg.src = 'cloud.png';
                break;
            case 'Clear':
                weatherImg.src = 'clear.png';
                break;
            case 'Rain':
                weatherImg.src = 'rain.png';
                break;
            case 'Mist':
                weatherImg.src = 'mist.png';
                break;
            case 'Snow':
                weatherImg.src = 'snow.png';
                break;
                case 'Smoke':
                    weatherImg.src = 'smoke.jpg';
                    break;
            default:
               
                break;
        }
    }
});
