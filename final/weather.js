const displayHourlyWeather = (weatherData) => {
    const hourView = document.querySelector('#hour-view');
    hourView.innerHTML = '';

    weatherData.forEach((hour) => {
        const hourly = document.createElement('hourlyElement');
        
        const timeElement = document.createElement('h3');
        timeElement.textContent = `${hour.time}`;
        
        const tempElement = document.createElement('p');
        tempElement.textContent = `Temperature: ${hour.temp_f} °F`;
        
        const conditionElement = document.createElement('p');
        conditionElement.textContent = `Condition: ${hour.condition.text}`;
        
        const iconElement = document.createElement('img');
        iconElement.setAttribute('src', `https:${hour.condition.icon}`);
        iconElement.setAttribute('alt', 'Weather Icon');
        
        hourly.appendChild(timeElement);
        hourly.appendChild(tempElement);
        hourly.appendChild(conditionElement);
        hourly.appendChild(iconElement);
        
        hourView.appendChild(hourly);
    });
};

const displayCurrentWeather = (currentWeatherData, highLow) => {
    document.querySelector('#current-temp').textContent = `${currentWeatherData.temp_f} °F`;
    document.querySelector('#condition').textContent = `${currentWeatherData.condition.text}`;
    document.querySelector('#condition-img').src = `${currentWeatherData.condition.icon}`;
    document.querySelector('#high-low').textContent = `${highLow.maxtemp_f} / ${highLow.mintemp_f} °F`;
    document.querySelector('#feel-temp').textContent = `Feels like ${currentWeatherData.feelslike_f} °F`;
};

const display3DayForecast = (forecastData) => {
    const dayView = document.querySelector('#day-view');
    dayView.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const dayData = forecastData[i];
        const dailyEntry = document.createElement('dailyElement');
        
        const dateElement = document.createElement('h3');
        dateElement.textContent = `${dayData.date}`;
        
        const tempElement = document.createElement('p');
        tempElement.textContent = `Temperature: ${dayData.day.maxtemp_f} / ${dayData.day.mintemp_f} °F`;
        
        const conditionElement = document.createElement('p');
        conditionElement.textContent = `Condition: ${dayData.day.condition.text}`;

        const iconElement = document.createElement('img');
        iconElement.setAttribute('src', `https:${dayData.day.condition.icon}`);
        iconElement.setAttribute('alt', 'Weather Icon');
        
        dailyEntry.appendChild(dateElement);
        dailyEntry.appendChild(tempElement);
        dailyEntry.appendChild(conditionElement);
        dailyEntry.appendChild(iconElement);
        
        dayView.appendChild(dailyEntry);
    }
};


const getForecast = async () => {
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?q=83440&days=4&key=a9ab171444b84e8393c202007241302');
    if (response.ok) {
        const data = await response.json();
        const currentWeatherData = data.current;
        const highLow = data.forecast.forecastday[0].day;
        const hourlyWeatherData = data.forecast.forecastday[0].hour;
        const threeDayForecastData = data.forecast.forecastday;
        displayCurrentWeather(currentWeatherData, highLow);
        displayHourlyWeather(hourlyWeatherData);
        display3DayForecast(threeDayForecastData);
    }
};

const divs = document.querySelectorAll('#current-view, #hour-view, #day-view');
for (const div of divs) {
    div.style.display = 'none';
}

document.querySelector('#current-view').style.display = 'block';

function showDiv(view) {
    for (const div of divs) {
        div.style.display = 'none';
    }
    document.querySelector(`#${view}`).style.display = 'block';
}

document.querySelector('#current').addEventListener('click', () => { showDiv('current-view') });
document.querySelector('#hour').addEventListener('click', () => { showDiv('hour-view') });
document.querySelector('#day').addEventListener('click', () => { showDiv('day-view') });

let api = ['Powered by '];
api.push('weatherapi.com');
document.querySelector('#api').textContent = api.join(' ');

getForecast();
