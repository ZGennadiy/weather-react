import React, { useContext } from 'react';
import { Context } from '../../context';
import { DateData } from '../DateData/DateData';
import s from './Location.module.scss';


export const Location = () => {
  const { weather } = useContext(Context);

  const chosenLocation = (data) => {
    if (data.location) {
      const { name, country } = data.location
      return `${name}, ${country}`
    } else if (data.error) {
      return `${data.error.message}`
    }
    return 'Воспользуйтесь поиском, чтобы получить информацию о погоде';
  }


  return (
    <div className={s.location}>
      <div className={s.location__city}>
        {chosenLocation(weather)}
      </div>
      <DateData/>
    </div>
  );
};
