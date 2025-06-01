import React, { useContext, useState } from 'react';
import { DataContext } from '../DataContext.jsx';

export default function OrderManagement() {
  const { customers, orders, addOrder } = useContext(DataContext);
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [form, setForm] = useState({ productName: '', quantity: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId) return;
    addOrder({ customerId: Number(customerId), ...form });
    setForm({ productName: '', quantity: 1 });
  };

  const customerOrders = orders.filter((o) => o.customerId === Number(customerId));

  return (
    <div>
      <h2>Auftragsverwaltung</h2>
      <label>
        Kunde:
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {customerOrders.map((o) => (
          <li key={o.id}>
            {o.productName} - Menge: {o.quantity}
          </li>
        ))}
      </ul>

      <h3>Neuen Auftrag anlegen</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Produktname"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
        />
        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}
