import React from 'react';
import data from './data';
import './App.css';

const RouteTable = ({ data: { routes, airlines, airports } }) => {

  return (
    <table className='routes-table'>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => {
          const airline = airlines.find(({id}) => id === route.airline);
          const source = airports.find(({code}) => code === route.src);
          const dest = airports.find(({code}) => code === route.dest);
          return (
            <Route key={`${route.airline}${route.src}${route.dest}`}
                   airline={airline}
                   source={source}
                   dest={dest}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const Route = ({ airline, source, dest }) => {
  return (
    <tr>
      <td>{airline.name}</td>
      <td>{source.name}</td>
      <td>{dest.name}</td>
    </tr>
  );
};

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