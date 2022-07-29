import React from 'react';
import data from './data';
import RouteTable from './components/RouteTable';
import './App.css';



const App = () => {
  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <RouteTable routes={data.routes} perPage={25} />
    </section>
  </div>
  );
};

export default App;