import React from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../actions';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      trip: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleAddTrip = (event) => {
    const { dispatch, history } = this.props;
    const { trip } = this.state;
    dispatch(addTrip(trip));
    this.setState({trip: ''});
    history.push('/add')
  }

  validateTrip = (password) => {
    const minChar = 2;
    return password.length >= minChar;
  }

  render() {
    const { trip } = this.state;
    return (
      <div>
        <input
          type="trip"
          name="trip"
          value={ trip }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.handleAddTrip }
          disabled={ !this.validateTrip(trip) }
        >
          Create Trip
        </button>
      </div>
    );
  }
}

export default connect()(Home);
