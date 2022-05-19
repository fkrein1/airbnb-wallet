export const addTrip = (trip) => ({
  type: 'ADD_TRIP',
  payload: trip,
});

const addCurrencies = (currencies) => ({
  type: 'ADD_CURRENCIES',
  payload: currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const currencyApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await currencyApi.json();
  const selectedCurrencies = ["USD", "CAD", "EUR", "GBP", "ARS", "JPY" ]
  const filteredCurrencies = Object.keys(currenciesData)
    .filter((currency) => selectedCurrencies.includes(currency));
  dispatch(addCurrencies([ ...filteredCurrencies, 'BRL' ]));
};

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const setExpense = (expense) => async (dispatch) => {
  const currencyApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await currencyApi.json();
  const payload = { 
    ...expense, 
    exchangeRates: { "BRL": { "code": "BRL", "ask": "1" }, ...currenciesData } 
  };
  dispatch(addExpense(payload));
};

export const removeExpense = (expense) => ({
  type: 'REMOVE_EXPENSE',
  payload: expense,
});

export const editExpense = (expense, index) => {
  return {
    type: 'EDIT_EXPENSE',
    payload: [index, expense],
  };
};

export const saveEditExpense = (expense, index, expenses) => {
  return {
    type: 'SAVE_EDIT_EXPENSE',
    payload: expenses[index] = expense,
  };
};
