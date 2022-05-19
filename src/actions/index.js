export const addEmail = (name) => ({
  type: 'ADD_EMAIL',
  payload: name,
});

const addCurrencies = (currencies) => ({
  type: 'ADD_CURRENCIES',
  payload: currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const currencyApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await currencyApi.json();
  const filteredCurrencies = Object.keys(currenciesData)
    .filter((currency) => currency !== 'USDT');
  dispatch(addCurrencies(filteredCurrencies));
};

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const setExpense = (walletState) => async (dispatch) => {
  const currencyApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesData = await currencyApi.json();
  const payload = { ...walletState, exchangeRates: { ...currenciesData } };
  dispatch(addExpense(payload));
};

export const removeExpense = (expense) => ({
  type: 'REMOVE_EXPENSE',
  payload: expense,
});

export const editExpense = (expense, index, expenses) => {
  expenses[index] = expense;
  return {
    type: 'EDIT_EXPENSE',
    payload: expenses,
  };
};
