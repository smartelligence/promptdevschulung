import React, { useContext } from 'react';
import { DataContext } from '../DataContext.jsx';

export default function ProductTable() {
  const { products } = useContext(DataContext);
  return (
    <div style={{ marginBottom: 32 }}>
      <h2>Produkte</h2>
      <table border="1" cellPadding="4" style={{ minWidth: 400, background: '#f8fafc', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} <span>&euro;</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
