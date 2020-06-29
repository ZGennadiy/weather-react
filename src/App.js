import React,  { useState } from 'react';
import { Context } from './context';
import { Search } from './components/Search/Search';
import { Location } from './components/Location/Location';
import { Weather } from './components/Weather/Weather';
import { Footer } from './components/Footer/Footer';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  return (
    <Context.Provider value={{query, setQuery, weather, setWeather}}>
      <div className="App">
        <main>
          <Search/>
          <Location/>
          <Weather/>
        </main>
        <Footer/>
      </div>
    </Context.Provider>
  );
}

export default App;
