import React from 'react';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../actions';
import { Link } from 'react-router-dom';

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
      <div className="wrapper">
        <nav></nav>
        <header>
          <p>Your trip to</p>
          <p id="trip">{ trip }</p>
          <div>
            <p>Total spent </p>
            <p id="spent">{`R$${ this.sumExpenses() }`}</p>
            <Link to="/add">
            <svg width="141" height="134" viewBox="0 0 151 144" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8" filter="url(#filter0_f_1_484)">
              <circle cx="75.4688" cy="75.5938" r="26.7188" fill="#1F615C"/>
              </g>
              <circle cx="75" cy="61" r="37.5" fill="#FF385C"/>
              <path d="M85.5469 61H64.4531M75 50.4531V71.5469V50.4531Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
              <filter id="filter0_f_1_484" x="0.75" y="0.875" width="149.438" height="149.438" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur_1_484"/>
              </filter>
              </defs>
            </svg>
          </Link>
          </div>
        </header>
          { expenses.map((expense, index) => (
            <div  key={ expense.exchangeRates.USD.timestamp } className="expense-card">
              <div className="expense-description">
                <p className="expense-focus">{ expense.description }</p>
                <p>{ expense.tag }</p>   
              </div> 
              <div>
                <p className="expense-focus">{ `${Number(expense.value).toFixed(2)} ${expense.currency}` } </p>
                <p>{ expense.method }</p>            
                <p>{ `${(this.askRate(expense) * Number(expense.value)).toFixed(2)} BRL`}</p>
              </div>
              <div className="card-button" >
                <button
                  type="button"
                  onClick={ () => this.editExpense(expense, index) }
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={ () => deleteExpense(expense) }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          
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