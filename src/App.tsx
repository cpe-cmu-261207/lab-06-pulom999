import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Current from './components/Current';
import About from './components/About';
import Dateselect from './components/Dateselect';
import Records from './components/Records';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Current />
        </Route>
        <Route path='/current'>
          <Current />
        </Route>
        <Route path='/history/select'>
          <Dateselect />
        </Route>
        <Route path='/history/' >
          <Records />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
