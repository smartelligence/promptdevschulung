import React, { useContext, useState } from 'react';
import { DataContext } from '../DataContext.jsx';

export default function CustomerManagement() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useContext(DataContext);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', street: '', plz: '', city: '', website: '' });
  const [showModal, setShowModal] = useState(false);

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      street: customer.street || '',
      plz: customer.plz || '',
      city: customer.city || '',
      website: customer.website || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCustomer(editingId, form);
      setEditingId(null);
    } else {
      addCustomer(form);
    }
    setForm({ name: '', email: '', street: '', plz: '', city: '', website: '' });
    setShowModal(false);
  };

  const openNewCustomerModal = () => {
    setEditingId(null);
    setForm({ name: '', email: '', street: '', plz: '', city: '', website: '' });
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Kundenverwaltung</h2>
      <button onClick={openNewCustomerModal}>Neuen Kunden anlegen</button>
      <table border="1" cellPadding="4" style={{ marginTop: 16, minWidth: 600 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Straße</th>
            <th>PLZ</th>
            <th>Ort</th>
            <th>Webseite</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.street || ''}</td>
              <td>{c.plz || ''}</td>
              <td>{c.city || ''}</td>
              <td>{c.website || ''}</td>
              <td>
                <button onClick={() => startEdit(c)}>Bearbeiten</button>{' '}
                <button onClick={() => deleteCustomer(c.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: 24, borderRadius: 8, minWidth: 320 }}>
            <h3>{editingId ? 'Kunde bearbeiten' : 'Neuen Kunden anlegen'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                placeholder="Straße"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                placeholder="PLZ"
                value={form.plz}
                onChange={(e) => setForm({ ...form, plz: e.target.value })}
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                placeholder="Ort"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <input
                placeholder="Webseite"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                style={{ display: 'block', marginBottom: 8, width: '100%' }}
              />
              <div style={{ marginTop: 12 }}>
                <button type="submit" style={{ marginRight: 8 }}>{editingId ? 'Aktualisieren' : 'Hinzufügen'}</button>
                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); }}>Abbrechen</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
