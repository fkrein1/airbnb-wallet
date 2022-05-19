import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies, setExpense } from '../actions';
import Nav from '../components/Nav';

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
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    addExpense({ value, description, currency, method, tag });
    this.setState({ value: '', description: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, btnAdd } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="description">
            Description:
            <input
              id="description"
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="value">
            Value:
            <input
              id="value"
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Currency:
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
            Payment Method:
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
            Category:
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

          <button type="button" onClick={ this.submitExpense } disabled={ btnAdd }>
            Add expense
          </button>
        </form>
        <Nav />
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