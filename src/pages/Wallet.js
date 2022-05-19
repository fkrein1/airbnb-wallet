import React from 'react';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../actions';
import Nav from '../components/Nav';

class Wallet extends React.Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const total = expenses
      .map(({ value, currency, exchangeRates }) => (
        Number(value) * Number(exchangeRates[currency].ask)
      ))
      .reduce((accumulator, curr) => accumulator + curr);
    return total.toFixed(2);
  };

  askRate = (expense) => Number(expense.exchangeRates[expense.currency].ask);

  editExpense = (expense, index) => {
    const { expenseToEdit, history } = this.props;
    expenseToEdit(expense, index);
    history.push('/edit');
  }

  render() {
    const { trip, expenses, deleteExpense } = this.props;
    return (
      <div>
        <header>
          <p>{ trip }</p>
          <p>Total: { this.sumExpenses() } BRL</p>
        </header>
          { expenses.map((expense, index) => (
            <ul key={ expense.exchangeRates.USD.timestamp }>
              <li>{ expense.description }</li>

              <li>{ `${Number(expense.value).toFixed(2)} ${expense.currency}` } </li>
              <li>{ `${this.askRate(expense).toFixed(2)} Exchange Rate` }</li>
              <li>{ `${(this.askRate(expense) * Number(expense.value)).toFixed(2)} BRL`}</li>
              <li>{ expense.tag }</li>
              <li>{ expense.method }</li>
              <li>
                <button
                  type="button"
                  onClick={ () => this.editExpense(expense, index) }
                >
                  Editar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </li>
            </ul>
          ))}
        <Nav />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => {
    dispatch(removeExpense(expense));
  },

  expenseToEdit: (expense, index) => {
    dispatch(editExpense(expense, index));
  },
});

const mapStateToProps = (state) => ({
  trip: state.travel.trip,
  expenses: state.wallet.expenses,
});


export default connect(mapStateToProps, mapDispatchToProps)(Wallet);