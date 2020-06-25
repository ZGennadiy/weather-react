import React from 'react';
import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p>
        Developed by: <a href="https://zgennadiy.com/" target="_blanc" title="Developer website">Zgennadiy.com</a> 
      </p>
      <p>
        Powered by <a href="https://www.weatherapi.com/" target="_blanc" title="Free Weather API">WeatherAPI.com</a>
      </p>
    </footer>
  )
};

export default Footer;