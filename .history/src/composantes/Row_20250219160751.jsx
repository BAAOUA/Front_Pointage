import React from 'react';

const Row({ emp , index}){
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{emp.nom}</td>
      <td>{emp.prenom}</td>
      <td>{emp.date}</td>
      <td>{emp.heureEntree}</td>
      <td>{emp.heureSortie}</td>
    </tr>
  );
};

 Row;
