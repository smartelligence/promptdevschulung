import React, { useContext, useState } from 'react';
import { DataContext } from '../DataContext.jsx';
import { Order, Customs } from '../models.js';

export default function OrderManagement() {
  const { customers, orders, addOrder, products } = useContext(DataContext);
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [form, setForm] = useState({ productId: products[0]?.id || '', quantity: 1, orderDate: '', deliveryDate: '' });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || !form.productId) return;
    // customs kann hier bei Bedarf ergänzt werden
    let customs = form.customs ? new Customs(form.customs) : undefined;
    addOrder(new Order({
      customerId: Number(customerId),
      productId: Number(form.productId),
      quantity: Number(form.quantity),
      orderDate: form.orderDate,
      deliveryDate: form.deliveryDate,
      customs
    }));
    setForm({ productId: products[0]?.id || '', quantity: 1, orderDate: '', deliveryDate: '' });
    setShowModal(false);
  };

  const customerOrders = orders.filter((o) => o.customerId === Number(customerId));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Auftragsverwaltung</h2>
      <label style={{ marginBottom: 16 }}>
        Kunde:
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} style={{ marginLeft: 8 }}>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => setShowModal(true)} style={{ marginBottom: 16 }}>Neuen Auftrag anlegen</button>
      <table border="1" cellPadding="4" style={{ minWidth: 600, background: '#f8fafc', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#2563eb', color: 'white' }}>
          <tr>
            <th>Produkt</th>
            <th>Menge</th>
            <th>Auftragsdatum</th>
            <th>Lieferdatum</th>
          </tr>
        </thead>
        <tbody>
          {customerOrders.map((o) => {
            const product = products.find(p => p.id === o.productId);
            return (
              <tr key={o.id}>
                <td>{product ? product.name : ''}</td>
                <td>{o.quantity}</td>
                <td>{o.orderDate}</td>
                <td>{o.deliveryDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: 24, borderRadius: 8, minWidth: 320 }}>
            <h3>Neuen Auftrag anlegen</h3>
            <form onSubmit={handleSubmit}>
              <label>Produkt:
                <select
                  value={form.productId}
                  onChange={e => setForm({ ...form, productId: e.target.value })}
                  required
                  style={{ display: 'block', marginBottom: 8, width: '100%' }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
                placeholder="Menge"
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                type="date"
                value={form.orderDate}
                onChange={e => setForm({ ...form, orderDate: e.target.value })}
                required
                placeholder="Auftragsdatum"
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                type="date"
                value={form.deliveryDate}
                onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
                required
                placeholder="Lieferdatum"
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <div style={{ marginTop: 12 }}>
                <button type="submit" style={{ marginRight: 8 }}>Hinzufügen</button>
                <button type="button" onClick={() => setShowModal(false)}>Abbrechen</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
