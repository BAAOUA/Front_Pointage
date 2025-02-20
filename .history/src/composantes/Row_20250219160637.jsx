// Row.js
import React from 'react';

const Row = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );
};

export default Row;
