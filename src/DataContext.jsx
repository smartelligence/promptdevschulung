import React, { createContext, useState } from 'react';
import { initialCustomers, initialOrders, initialProducts } from './data.js';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState(initialOrders);
  const [products] = useState(initialProducts);

  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }]);
  };

  const updateCustomer = (id, updated) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    setOrders(orders.filter((o) => o.customerId !== id));
  };

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: Date.now() }]);
  };

  return (
    <DataContext.Provider
      value={{ customers, orders, products, addCustomer, updateCustomer, deleteCustomer, addOrder }}
    >
      {children}
    </DataContext.Provider>
  );
}
