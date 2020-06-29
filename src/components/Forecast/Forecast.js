import React, { useContext } from 'react';
import { Context } from '../../context';
import s from './Forecast.module.scss';


export const Forecast = () => {
  const { weather } = useContext(Context);
  const [day1, day2, day3] = weather.forecast.forecastday;

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
            <img className={s.weather__icon} src={`http:${icon}`} alt={`${day} ${month} weather icon`}/>
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
  };

  return (
    <div className={s.weather__forecastDayly}>
      {[day1, day2, day3].map(daylyMap)}
    </div>
  )
}