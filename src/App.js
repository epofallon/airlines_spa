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
      <RouteTable data={data} />
    </section>
  </div>
  );
};

export default App;