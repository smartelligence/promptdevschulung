import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Navigation', () => {
  test('zeigt Kundenverwaltung initial an', () => {
    render(<App />);
    expect(screen.getByText(/Kundenverwaltung/)).toBeInTheDocument();
  });

  test('wechselt zur Auftragsverwaltung', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Aufträge/ }));
    expect(screen.getByText(/Auftragsverwaltung/)).toBeInTheDocument();
  });
});
