import {useEffect, useState} from 'react';
import {Card, Paragraph, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import GetLocation from 'react-native-get-location';
import OpenWeatherMap from 'openweathermap-ts';

const API_KEY = '94a25ee05e1b5eccc5ae97c42c75257b';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getWeatherIcon = (weatherCondition: string) => {
  switch (weatherCondition) {
    case 'Clouds':
      return 'weather-cloudy';
    case 'Clear':
      return 'weather-sunny';
    default:
      return weatherCondition;
  }
};

const openWeather = new OpenWeatherMap({
  apiKey: API_KEY,
});
//Array<{min_temp: Number; max_temp: Number; day: Number}>
async function getWeather(): Promise<
  Array<{min_temp: Number; max_temp: Number; day: Number; main: string}>
> {
  let forecast: {
    min_temp: Number;
    max_temp: Number;
    day: Number;
    main: string;
  }[] = [];
  openWeather.setUnits('metric');
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });
  const weather = await openWeather.getThreeHourForecastByGeoCoordinates(
    location.latitude,
    location.longitude,
  );
  weather.list.forEach(item => {
    let curr_date = new Date();
    let weather_date = new Date(item.dt_txt);
    if (curr_date.getDate() === weather_date.getDate()) {
      return;
    }
    if (forecast.filter(e => e.day === weather_date.getDate()).length === 0) {
      forecast.push({
        min_temp: item.main.temp_min,
        max_temp: item.main.temp_max,
        day: weather_date.getDate(),
        main: item.weather[0].main,
      });
      //console.log(true);
    } else {
      if (item.main.temp_min < forecast[forecast.length - 1].min_temp) {
        forecast[forecast.length - 1].min_temp = item.main.temp_min;
      }
      if (item.main.temp_max > forecast[forecast.length - 1].max_temp) {
        forecast[forecast.length - 1].max_temp = item.main.temp_max;
      }
    }
  });
  const currWeather = await openWeather.getCurrentWeatherByGeoCoordinates(
    location.latitude,
    location.longitude,
  );
  console.log(currWeather);
  const currentWeather = {
    day: new Date().getDate(),
    main: currWeather.weather[0].main,
    max_temp: currWeather.main.temp_max,
    min_temp: currWeather.main.temp_min,
  };
  forecast.unshift(currentWeather);
  return forecast;
}

const WeatherCard = () => {
  const currDay = new Date().getDay();
  const [weather, setWeather] = useState<
    {min_temp: Number; max_temp: Number; day: Number; main: string}[]
  >([]);
  useEffect(() => {
    const dataAPI = async () => {
      const data = await getWeather();
      setWeather(data);
    };
    dataAPI();
  }, []);

  // @ts-ignore
  return (
    <Card
      style={{
        width: '48%',
        height: '100%',
      }}>
      <Card.Content>
        <Title>Weather</Title>
        <Paragraph>
          Today {weather[0]?.min_temp} / {weather[0]?.max_temp}
          {'\xB0C'} - {weather[0]?.main}
          <Icon
            name={getWeatherIcon(weather[0]?.main)}
            size={20}
            color="#900"
          />{' '}
          {'\n'}
          Tomorrow {weather[1]?.min_temp} / {weather[1]?.max_temp}
          {'\xB0C'} - {weather[1]?.main}
          <Icon
            name={getWeatherIcon(weather[1]?.main)}
            size={20}
            color="#900"
          />
          {'\n'}
          {days[currDay + 2]} {weather[2]?.min_temp} / {weather[2]?.max_temp}
          {'\xB0C'} - {weather[2]?.main}
          <Icon
            name={getWeatherIcon(weather[2]?.main)}
            size={20}
            color="#900"
          />
          {'\n'}
          {days[currDay + 3]} {weather[3]?.min_temp} / {weather[3]?.max_temp}
          {'\xB0C'} - {weather[3]?.main}
          <Icon
            name={getWeatherIcon(weather[3]?.main)}
            size={20}
            color="#900"
          />
          {'\n'}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;
