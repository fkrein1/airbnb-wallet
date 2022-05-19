import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatch(addEmail(email));
    history.push('/carteira');
  }

  validateEmail = (email) => {
    const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegrex.test(email);
  }

  validatePassword = (password) => {
    const minChar = 6;
    return password.length >= minChar;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ !this.validateEmail(email) || !this.validatePassword(password) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.arrayOf.isRequired,
};
