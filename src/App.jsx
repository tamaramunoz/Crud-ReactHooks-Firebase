import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import Reset from './components/Reset';


import { auth } from './firebase';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Fragment>
      <Router>
        <div className="container mt-5">
          <Navbar
            firebaseUser={firebaseUser}
          />
          <Switch>
            <Route exact path="/">
              inicio..
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>

            <Route path="/reset">
              <Reset />
            </Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  ) : (
      <p>Cargando..</p>
    )
}

export default App;
