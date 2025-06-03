import React, { createContext, useState } from 'react';
import { initialCustomers, initialOrders, initialProducts } from './data.js';
import { Customer, Product, Order, Customs } from './models.js';

export const DataContext = createContext();

export function DataProvider({ children }) {
  // Initialdaten in Instanzen der jeweiligen Klassen umwandeln
  const [customers, setCustomers] = useState(initialCustomers.map(c => new Customer(c)));
  const [orders, setOrders] = useState(initialOrders.map(o => {
    let customs = o.customs ? new Customs(o.customs) : undefined;
    return new Order({ ...o, customs });
  }));
  const [products] = useState(initialProducts.map(p => new Product(p)));

  const addCustomer = (customer) => {
    setCustomers([...customers, new Customer({ ...customer, id: Date.now() })]);
  };

  const updateCustomer = (id, updated) => {
    setCustomers(customers.map((c) => (c.id === id ? new Customer({ ...c, ...updated }) : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    setOrders(orders.filter((o) => o.customerId !== id));
  };

  const addOrder = (order) => {
    let customs = order.customs ? new Customs(order.customs) : undefined;
    setOrders([...orders, new Order({ ...order, id: Date.now(), customs })]);
  };

  return (
    <DataContext.Provider
      value={{ customers, orders, products, addCustomer, updateCustomer, deleteCustomer, addOrder }}
    >
      {children}
    </DataContext.Provider>
  );
}
