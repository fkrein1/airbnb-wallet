import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helper/renderWithRouterAndRedux';
import { initialStateWithExpenses } from './mock/mock'
import App from '../App';

afterEach(() => jest.clearAllMocks());

describe('2) Test initial wallet render and add, delete and edit expense', () => {
  it('renders wallet', () => {
    renderWithRouterAndRedux(<App />, { initialState: initialStateWithExpenses, initialEntries: ['/wallet']});
    const trip = screen.getByText(/paris/i);
    const spendText = screen.getByText(/total spent/i);
    const totalSpend = screen.getByText(/187.12/i);
    expect(trip).toBeInTheDocument();
    expect(spendText).toBeInTheDocument();
    expect(totalSpend).toBeInTheDocument();
  })
  
  it('deletes second expense', () => {
    renderWithRouterAndRedux(<App />, { initialState: initialStateWithExpenses, initialEntries: ['/wallet']});
    const expense = screen.getByText(/vinte euros/i);
    expect(expense).toBeInTheDocument();
    
    const deleteBtns = screen.getAllByRole('button', { name: /delete/i });
    userEvent.click(deleteBtns[1]);
    expect(expense).not.toBeInTheDocument();
  })
})
