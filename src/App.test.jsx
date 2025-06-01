import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('zeigt Hello World an', () => {
    render(<App />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  test('zeigt aktuelle UTC Uhrzeit an', () => {
    render(<App />);
    expect(screen.getByText(/aktuelle utc uhrzeit/i)).toBeInTheDocument();
  });

  test('erhöht den Zähler beim Klick', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is x/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent('count is x 1');
  });
});

