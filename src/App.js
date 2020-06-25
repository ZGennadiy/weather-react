import React from 'react';
import DisplayWeather from './components/DisplayWeather';
import Footer from './components/Footer';



function App() {

  return (
    <div className="App">
      <main>
        <DisplayWeather />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
