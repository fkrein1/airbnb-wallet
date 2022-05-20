import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies, setExpense } from '../actions';
import { Link } from 'react-router-dom';

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Credit Card',
      tag: 'Entertainment',
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
    const { addExpense, history } = this.props;
    const { value, description, currency, method, tag } = this.state;
    addExpense({ value, description, currency, method, tag });
    this.setState({ value: '', description: '' });
    history.push('/wallet')
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="wrapper">
        <nav><Link to="/wallet">&lt;</Link></nav>
        <form>
          <label htmlFor="description">
            DESCRIPTION
            <br></br>
            <input
              id="description"
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="value">
            AMOUNT
            <br></br>
            <input
              id="value"
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            CURRENCY
            <br></br>
            <select
              id="currency"
              name="currency"
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
            PAYMENT METHOD
            <br></br>
            <select
              id="paymentMethod"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </label>

          <label htmlFor="category">
            CATEGORY
            <br></br>
            <select
              id="category"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Lodging">Lodging</option>
              <option value="Transportation">Transportation</option>
            </select>
          </label>

          <button type="button" onClick={ this.submitExpense }>
            Add expense
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => {
    dispatch(getCurrencies());
  },
  addExpense: (state) => {
    dispatch(setExpense(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);