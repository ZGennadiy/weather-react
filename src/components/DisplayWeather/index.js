import React, { useState } from 'react';
import api from '../API/api';
import s from './DisplayWeather.module.scss';
import useSearch from '../../assets/useSearch.svg';


const Search = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const { key , http, https } = api;
  const { protocol } = window.location;
  const baseUrl = protocol === 'http:' ? http : https;
  
  const search = (evt) => {
    if (evt.key === 'Enter' && query !== '') {
      fetch(`${baseUrl}key=${key}&q=${query}&lang=ru&days=3`)
      .then((res) => res.json())
      .then((result) => {
          setWeather(result);
          if (!result.error) {
            setQuery('');
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const dateBuilder = (date) => {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const currentDay = days[date.getDay()];
    const currentDate = date.getDate();
    const currentMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();

    return `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
  };

  const chosenLocation = (data) => {
    if (data.location) {
      const { name, country } = data.location
      return `${name}, ${country}`
    } else if (data.error) {
      return `${data.error.message}`
    }
    return 'Воспользуйтесь поиском, чтобы получить информацию о погоде';
  }

  const getForecast = (forecastData) => {
    if (forecastData.current) {
      const { temp_c, feelslike_c, wind_kph, humidity } = forecastData.current;
      const { icon, text } = forecastData.current.condition;
      const [day1, day2, day3] = forecastData.forecast.forecastday;
      
      const daylyMap = (dayData) => {
        const { icon, text } = dayData.day.condition;
        const { avgtemp_c, maxtemp_c, mintemp_c, daily_chance_of_rain, daily_chance_of_snow } =  dayData.day;
        const { date } = dayData;
        const [, month, day] = date.split('-');

        return (
          <div className={[s.weather, s.weather__dayly].join(' ')} key={`${day}${month}`}>
              <div className={s.weather__day}>{`${day} / ${month}`}</div>
            <div className={s.weather__wrapper}>
              <div className={s.weather__main}>
                <img className={s.weather__icon} src={`http://${icon.substring(2)}`} alt={`${day} ${month} weather icon`}/>
                <div className={s.weather__temperature}>{Math.floor(avgtemp_c)}&deg;C</div>
              </div>
              <div className={s.weather__info}>
                <div>Мин: {Math.floor(mintemp_c)}&deg;C</div>
                <div>Макс: {Math.floor(maxtemp_c)}&deg;C</div>
                <div>{`Осадки: ${Math.max(daily_chance_of_rain, daily_chance_of_snow)}%`}</div>
              </div>
            </div>
            <div className={s.weather__descr}><div>{text}</div></div> 
          </div>
        )
      }

      return (
        <>
          <div className={s.weather}>
          <div className={s.weather__wrapper}>
            <div className={s.weather__main}>
              <img className={s.weather__icon} src={`http://${icon.substring(2)}`} alt="Current weather icon"/>
              <div className={s.weather__temperature}>{Math.floor(temp_c)}&deg;C</div>
            </div>
            <div className={s.weather__info}>
              <div>{`Ощущается как ${Math.floor(feelslike_c)}`}&deg;C</div>
              <div>{`Ветер ${wind_kph} км/ч`}</div>
              <div>{`Влажность ${humidity}%`}</div>
            </div>
          </div>
          <div className={s.weather__descr}><div>{text}</div></div> 
          </div>
          <hr/>
          <div className={s.weather__forecastDayly}>
            {[day1, day2, day3].map(daylyMap)}
          </div>
        </>
      );
    }

    return (
      <div className={s.weather}>
        <img src={useSearch} alt="Use search icon" className={s.weather__useSearch}/>
      </div>
    );
  }

    return (
    <>
      <div className={s.search}>
        <input 
          type="text"
          className={s.search__bar}
          placeholder="Search..."
          onChange={({ target }) => setQuery(target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      <div className={s.location}>
        <div className={s.location__city}>
          {chosenLocation(weather)}
        </div>
        <div className={s.date}>{dateBuilder(new Date())}</div>
      </div>
      {getForecast(weather)}
    </>
  );
};

export default Search;