// LazyRow.js
import React from 'react';

// Composant de ligne de la table
const LazyRow = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );
};

export default LazyRow;
