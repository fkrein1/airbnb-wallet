import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, setExpense, removeExpense, editExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      btnAdd: false,
      btnEdit: true,
      exEdit: {},
      exInd: '',
    };
  }

  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  submitExpense = () => {
    const { addExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const id = expenses.length;
    const idPlusExpense = { id, value, description, currency, method, tag };
    addExpense(idPlusExpense);
    this.setState({ value: '', description: '', currency: 'USD', method: 'Dinheiro' });
  }

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

  ask = (expense) => Number(expense.exchangeRates[expense.currency].ask);

  editExpense = (selectedExpense, index) => {
    this.setState({
      exEdit: selectedExpense,
      exInd: index,
      btnEdit: false,
      btnAdd: true,
    });
  }

  submitEditExpense = () => {
    const { expenses, changeExpense } = this.props;
    const { value, description, currency, method, tag, exEdit, exInd } = this.state;

    const editedExpense = { ...exEdit, value, description, currency, method, tag };
    changeExpense(editedExpense, exInd, expenses);
    this.setState({ value: '', description: '', currency: 'USD', method: 'Dinheiro' });
    this.setState({ btnEdit: true, btnAdd: false, exEdit: {}, exInd: '' });
  }

  render() {
    const { email, currencies, expenses, deleteExpense } = this.props;
    const { value, description, currency, method, tag, btnAdd, btnEdit } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            { this.sumExpenses() }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>

        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              type="text"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((countryCurrency) => (
                <option
                  key={ countryCurrency }
                  value={ countryCurrency }
                >
                  { countryCurrency }
                </option>))}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de Pagamento:
            <select
              id="paymentMethod"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.submitExpense } disabled={ btnAdd }>
            Adicionar despesa
          </button>
          <button type="button" disabled={ btnEdit } onClick={ this.submitEditExpense }>
            Editar despesa
          </button>
        </form>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { expenses.map((expense, index) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ this.ask(expense).toFixed(2) }</td>
              <td>{ (this.ask(expense) * Number(expense.value)).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editExpense(expense, index) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}

        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => {
    dispatch(getCurrencies());
  },
  addExpense: (state) => {
    dispatch(setExpense(state));
  },
  deleteExpense: (state) => {
    dispatch(removeExpense(state));
  },
  changeExpense: (expense, index, expenses) => {
    dispatch(editExpense(expense, index, expenses));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  changeExpense: PropTypes.func.isRequired,
};
