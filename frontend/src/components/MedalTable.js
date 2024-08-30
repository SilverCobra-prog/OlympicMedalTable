import React from 'react';
import '../styles/Table.css';

function MedalTable({ medals, onAthleteClick }) {
  return (
    <div className="table-container">
      <table className="medal-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Flag</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
            <th>Total</th>
            <th>Athlete</th>
          </tr>
        </thead>
        <tbody>
          {medals.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.country}</td>
              <td>
                <img src={item.flag_url} alt={`${item.country} flag`} width="40" />
              </td>
              <td>{item.gold}</td>
              <td>{item.silver}</td>
              <td>{item.bronze}</td>
              <td>{item.total}</td>
              <td>
                <button onClick={() => onAthleteClick(item.athlete_id)}>
                  {item.athlete_name}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedalTable;
