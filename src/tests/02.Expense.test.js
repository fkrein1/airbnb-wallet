import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helper/renderWithRouterAndRedux';
import { initialStateWithoutExpenses, initialStateWithExpenses, currencyData } from './mock/mock'
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

  it('add expense', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(currencyData)
    });

    const { history, debug, store } = renderWithRouterAndRedux(<App />, { 
      initialEntries: ['/wallet']
    });

    const addBtn = screen.getByRole('link', { src: '/add'})
    expect(addBtn).toBeInTheDocument();
    userEvent.click(addBtn);
    expect(history.location.pathname).toBe('/add');

    const dolar = screen.queryByText('USD')

    const descriptionInput = screen.getByRole('textbox', { name: /description/i});
    userEvent.type(descriptionInput, 'car rental');
    expect(descriptionInput).toHaveValue('car rental')

    
    const amountInput = screen.getByRole('textbox', {  name: /amount/i});
    userEvent.type(amountInput, '400');
    expect(amountInput).toHaveValue('400')

    const addExpenseBtn = screen.getByRole('button', { name: /add expense/i});
    userEvent.click(addExpenseBtn);
    expect(history.location.pathname).toBe('/wallet');

    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toBeCalledTimes(2)
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all')

  })
})



// describe('Tests if mock search works', () => {
//   const koromon = [
//     {
//       name: 'Koromon',
//       img: 'https://digimon.shadowsmith.com/img/koromon.jpg',
//       level: 'In Training',
//     },
//   ];
//   it('renders Koromon', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(koromon),
//     });

//     render(<App />);
//     const textBox = screen.getByRole('textbox', { name: /digimon/i });
//     const btn = screen.getByRole('button', { name: /search digimon/i });
//     userEvent.type(textBox, 'koromon');
//     userEvent.click(btn);

//     const digimonImage = await screen.findByRole('img', { name: /koromon/i });
//     expect(digimonImage).toBeInTheDocument();
//     expect(global.fetch).toBeCalledTimes(1);
//     expect(global.fetch).toBeCalledWith('https://digimon-api.vercel.app/api/digimon/name/koromon');
//   });
// })