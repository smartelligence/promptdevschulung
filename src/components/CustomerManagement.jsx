import React, { useContext, useState } from 'react';
import { DataContext } from '../DataContext.jsx';

export default function CustomerManagement() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useContext(DataContext);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setForm({ name: customer.name, email: customer.email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCustomer(editingId, form);
      setEditingId(null);
    } else {
      addCustomer(form);
    }
    setForm({ name: '', email: '' });
  };

  return (
    <div>
      <h2>Kundenverwaltung</h2>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.name} ({c.email}){' '}
            <button onClick={() => startEdit(c)}>Bearbeiten</button>{' '}
            <button onClick={() => deleteCustomer(c.id)}>Löschen</button>
          </li>
        ))}
      </ul>

      <h3>{editingId ? 'Kunde bearbeiten' : 'Neuen Kunden anlegen'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editingId ? 'Aktualisieren' : 'Hinzufügen'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Abbrechen</button>}
      </form>
    </div>
  );
}
