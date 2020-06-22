import React from 'react';
import s from './Search.module.scss';

const Search = () => {
    return (
    <div className={s.search__box}>
      <input type="text" className={s.search__bar} placeholder="Search..."/>
    </div>
  );
};

export default Search;