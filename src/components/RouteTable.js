import React from 'react';
import { getAirlineById, getAirportByCode } from '../data';

const RouteTable = ({ data: { routes } }) => {
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
          return (
            <Route key={`${route.airline}${route.src}${route.dest}`}
                   airline={getAirlineById(route.airline)}
                   source={getAirportByCode(route.src)}
                   dest={getAirportByCode(route.dest)}
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

export default RouteTable;