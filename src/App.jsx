import React, { useState } from 'react';
import { DataProvider } from './DataContext.jsx';
import CustomerManagement from './components/CustomerManagement.jsx';
import OrderManagement from './components/OrderManagement.jsx';
import './App.css';

function App() {
  const [view, setView] = useState('customers');

  return (
    <DataProvider>
      <div>
        <nav>
          <button onClick={() => setView('customers')}>Kunden</button>
          <button onClick={() => setView('orders')}>Aufträge</button>
        </nav>
        {view === 'customers' && <CustomerManagement />}
        {view === 'orders' && <OrderManagement />}
      </div>
    </DataProvider>
  );
}

export default App;
