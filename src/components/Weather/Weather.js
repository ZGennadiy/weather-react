import React, { useContext } from 'react';
import { Context } from '../../context';
import { Forecast } from '../Forecast/Forecast';
import s from './Weather.module.scss';
import useSearch from '../../assets/useSearch.svg';


export const Weather = () => {
  const { weather } = useContext(Context);
  if (weather.current) {
    const { temp_c, feelslike_c, wind_kph, humidity } = weather.current;
    const { icon, text } = weather.current.condition;
    
    return (
      <>
        <div className={s.weather}>
        <div className={s.weather__wrapper}>
          <div className={s.weather__main}>
            <img className={s.weather__icon} src={`http:${icon}`} alt="Current weather icon"/>
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
        <Forecast/>
      </>
    );
  }

  return (
    <div className={s.weather}>
      <img src={useSearch} alt="Use search icon" className={s.weather__useSearch}/>
    </div>
  );
};
