import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helper/renderWithRouterAndRedux';
import App from '../App';

describe('1) Initial render and add trip functionality:', () => {
  it('renders input and submit button', () => {
    renderWithRouterAndRedux(<App />);
    const tripInput = screen.getByRole('textbox');
    const placeholderText = screen.getByPlaceholderText(/where are you going/i);
    const button = screen.getByRole('button', { name: /create trip/i });
    expect(tripInput).toBeInTheDocument();
    expect(placeholderText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('saves trip destination after submit', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const tripInput = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /create trip/i });
    userEvent.type(tripInput, 'France');
    userEvent.click(button);
    const trip = screen.getByText('France');
    expect(trip).toBeInTheDocument()
    expect(history.location.pathname).toBe('/wallet');
  })
})
