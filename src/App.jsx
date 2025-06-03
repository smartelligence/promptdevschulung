import React, { useState } from 'react';
import { DataProvider } from './DataContext.jsx';
import CustomerManagement from './components/CustomerManagement.jsx';
import OrderManagement from './components/OrderManagement.jsx';
import ProductTable from './components/ProductTable.jsx';
import './App.css';

function App() {
  const [view, setView] = useState('customers');

  return (
    <DataProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <nav style={{ width: 200, background: '#f4f4f4', padding: 24, boxSizing: 'border-box' }}>
          <h3>Menü</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <button style={{ width: '100%', marginBottom: 8 }} onClick={() => setView('customers')}>
                Kunden
              </button>
            </li>
            <li>
              <button style={{ width: '100%', marginBottom: 8 }} onClick={() => setView('orders')}>
                Aufträge
              </button>
            </li>
            <li>
              <button style={{ width: '100%' }} onClick={() => setView('products')}>
                Produkte
              </button>
            </li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: 32 }}>
          {view === 'customers' && <CustomerManagement />}
          {view === 'orders' && <OrderManagement />}
          {view === 'products' && <ProductTable />}
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
