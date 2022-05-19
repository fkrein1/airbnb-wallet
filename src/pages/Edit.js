import React from 'react';
import { connect } from 'react-redux';
import { saveEditExpense } from '../actions';
import Nav from '../components/Nav';

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { expenseToEdit } = this.props;
    if(expenseToEdit !== undefined) {
      const { value, description, currency, method, tag } = expenseToEdit;
      this.setState({ value, description, currency, method, tag });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  editExpense = () => {
    const { expenseToEdit, expenseToEditIndex, expenses, history } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editedExpense = { ...expenseToEdit, value, description, currency, method, tag };
    saveEditExpense(editedExpense, expenseToEditIndex, expenses);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
    history.push('/wallet');
  }

  render() {
    const { expenseToEdit, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        { expenseToEdit === undefined && <h2>Expense not selected</h2>}
        { expenseToEdit !== undefined && (
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
  
            <button type="button" onClick={ this.editExpense }>
              Save Edit
            </button>
          </form>

        )}
        <Nav />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.expenseToEdit[1],
  expenseToEditIndex: state.wallet.expenseToEdit[0],
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setEditExpense: (expense, index, expenses) => {
    dispatch(saveEditExpense(expense, index, expenses));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);