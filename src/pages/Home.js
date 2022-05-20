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
    history.push('/wallet')
  }

  render() {
    const { trip } = this.state;
    return (
      <div id="home" className="wrapper">
        <input
          type="trip"
          name="trip"
          value={ trip }
          onChange={ this.handleChange }
          placeholder="Where are you going?"
        />
        <button
          type="button"
          onClick={ this.handleAddTrip }
        >
          Create trip
        </button>
      </div>
    );
  }
}

export default connect()(Home);
