import React, { useContext } from 'react';
import { Context } from '../../context';
import { api } from '../API/api';
import s from './Search.module.scss';

export const Search = () => {
  const { key , http, https } = api;
  const { protocol } = window.location;
  const baseUrl = protocol === 'http:' ? http : https;
  const { query, setQuery, setWeather } = useContext(Context);

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

  return (
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
  );
};

