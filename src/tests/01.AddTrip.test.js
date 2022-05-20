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