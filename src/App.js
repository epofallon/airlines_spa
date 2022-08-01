import React, { useState } from 'react';
import data, { getAirlineById, getAirportByCode } from './data';
import RouteTable from './components/RouteTable';
import Select from './components/Select';
import Map from './components/Map';
import './App.css';

const App = () => {
  const [airline, setAirline] = useState({ name: 'All Airlines', id: 0 });
  const [airport, setAirport] = useState({ name: 'All Airports', code: '' });
  
  const filterByAirline = (id, routes) => {
    if (airline.id === 0) return routes;
    return routes.filter(({ airline }) => airline === id);
  };

  const filterByAirport = (code, routes) => {
    if (airport.code === '') return routes;
    return routes.filter(({ src, dest }) => src === code || dest === code);
  };

  const selectAirline = id => {
    setAirline(getAirlineById(Number(id)) || { name: 'All Airlines', id: 0 });
  };

  const selectAirport = code => {
    setAirport(getAirportByCode(code) || { name: 'All Airports', code: '' });
  }

  const showAll = () => {
    setAirline({ name: 'All Airlines', id: 0 });
    setAirport({ name: 'All Airports', code: '' });
  };

  const filteredByAirline = filterByAirline(airline.id, data.routes);
  const filteredRoutes = filterByAirport(airport.code, filteredByAirline);

  const filteredAirlines = data.airlines.map(airline => {
    const active = !!filteredRoutes.find(route =>  route.airline === airline.id);
    return { ...airline, active };
  });

  const filteredAirports = data.airports.map(airport => {
    const active = !!filteredRoutes.find(({src, dest}) => {
      return src === airport.code || dest === airport.code;
    });
    return { ...airport, active };
  });

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <Map routes={filteredRoutes}  airports={data.airports}/>

      <div>
        Show routes on
        <Select filter={selectAirline}
                options={filteredAirlines}
                allTitle="All Airlines"
                value={airline.id}
        />
        flying in or out of 
        <Select filter={selectAirport}
                options={filteredAirports}
                allTitle="All Airports"
                value={airport.code}
        />
        <button onClick={showAll}
                disabled={data.routes.length === filteredRoutes.length}>
          Show All Routes
        </button>
      </div>
      
      <RouteTable routes={filteredRoutes} perPage={25} />
    </section>
  </div>
  );
};

export default App;