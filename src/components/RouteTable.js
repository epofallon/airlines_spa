import React, { useState } from 'react';
import { getAirlineById, getAirportByCode } from '../data';

const RouteTable = ({ routes, perPage }) => {
  const [page, setPage] = useState(1);
  
  const end = page * perPage;
  const listRoutes = () => {
    return routes.slice(end - perPage, end).map((route) => (
      <Route key={`${route.airline}${route.src}${route.dest}`}
             airline={getAirlineById(route.airline)}
             src={getAirportByCode(route.src)}
             dest={getAirportByCode(route.dest)}
      />
    ));
  };

  return (
    <>
      <table className='routes-table'>
        <thead>
          <tr>
            <th>Airline</th><th>Source Airport</th><th>Destination Airport</th>
          </tr>
        </thead>
        <tbody>{listRoutes()}</tbody>
      </table>

      <Info start={end - perPage + 1} end={end} total={routes.length} />

      <button className='pagination'
              onClick={() => setPage(page - 1)}
              disabled={end - perPage === 0}>
        Previous Page
      </button>

      <button className='pagination'
              onClick={() => setPage(page + 1)}
              disabled={end === routes.length}>
        Next Page
      </button>
    </>
  );
};

const Route = ({ airline, src, dest }) => {
  return (
    <tr>
      <td>{airline.name}</td>
      <td>{src.name}</td>
      <td>{dest.name}</td>
    </tr>
  );
};

const Info = ({ start, end, total }) => {
  return <div>Showing {start}-{end} of {total} routes.</div>
};

export default RouteTable;