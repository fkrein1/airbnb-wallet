// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseToEdit: {},
}

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense !== action.payload)],
    };
  case 'EDIT_EXPENSE':
    return { ...state, expenseToEdit: action.payload };
  case 'SAVE_EDIT_EXPENSE':
    return { ...state, expenseToEdit: [], expenses: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
