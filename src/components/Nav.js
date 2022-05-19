import React from 'react';
import { Link } from 'react-router-dom';


class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/wallet">Wallet</Link>
        <Link to="/add">Add</Link>
      </nav>
    );
  }
}

export default Nav;
