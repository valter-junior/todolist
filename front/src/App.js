import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import {Home} from './home';
import Login from './login/login';
import SignIn from './login/sign.in';
import {ProtectedRoute} from './protected.route'




function App () {
  return (
    <div>
      <Container>
       
      
          <Switch>
            <ProtectedRoute exact path="/login" component={Home}>
              <Login />
            </ProtectedRoute>
              
            <Route path="/sign-in" component={SignIn}>
              <SignIn />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      

      </Container>
      
    </div>
  )
}


export default App;