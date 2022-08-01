import React, { useState } from 'react';
import data, { getAirlineById, getAirportByCode } from './data';
import RouteTable from './components/RouteTable';
import Select from './components/Select';
import './App.css';

// const Map = () => {
//   const x1 = 53.309700012200004;
//   const y1 = -113.580001831;
//   return (
//     <svg className="map" viewBox="-180 -90 360 180">
//       <g transform="scale(1 -1)">
//         <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        
//         {/* for each route */}
//         <g key="">
//           <circle className="source" cx={x1} cy={y1}>
//             <title></title>
//           </circle> 
//           <circle className="destination" cx={x1} cy={y1}>
//             <title></title>
//           </circle>
//           <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
//         </g>
//         {/* end route */}
        
//       </g>
//     </svg>
//   );
// }

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
      {/* <Map /> */}

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