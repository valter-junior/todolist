import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './home';
import Login from './login/login';
import SignIn from './login/sign.in';


function App () {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;