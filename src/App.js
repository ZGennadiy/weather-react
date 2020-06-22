import React from 'react';
import Search from './components/Search';

import 'normalize.css';

const api = {
  locationURL: 'https://www.metaweather.com/api/location/search/?query'
};



function App() {
  return (
    <div className="App weather-warm">
      <main>
        <Search/>
      </main>
    </div>
  );
}

export default App;
