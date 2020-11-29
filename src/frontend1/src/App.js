import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import { useKeycloak } from '@react-keycloak/web'

import Root from './components/Root'
import Nav from './components/Nav'

function App() {

  const { keycloak } = useKeycloak()

  return (
    <Router>
      <React.Fragment>
        <Nav authorized={keycloak.authenticated}/>
        <Switch>
          <Route path="/" component={() => <Root/>}/>
          <Route component={({history}) => {history.push('/'); return "";}}/>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;