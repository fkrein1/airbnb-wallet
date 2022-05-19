import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <Switch>
      <Route exact path="/wallet" component={ Wallet } />
      <Route exact path="/add" component={ Add } />
      <Route exact path="/edit" component={ Edit } />
      <Route path="/" component={ Home } />
    </Switch>
  );
}

export default App;
