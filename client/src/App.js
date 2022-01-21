import './App.css';
import React, { Fragment, useState, useEffect } from 'react';

//requires @5 the route code below didn't work with 6 and i couldnt figure out how to refactor it
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  const[isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth () {
    try {
      
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect( () => {
    isAuth();
  })
  return (
    <Fragment>
      <Router>
        <div className='container'>
        <Switch>

          {/* if not authenticated login if they are authenticated redirect to dashboard */}
            <Route exact path="/login" render= {props => 
              !isAuthenticated ? (
              <Login {...props} setAuth={setAuth}/>
            ) : 
              <Redirect to="/dashboard" />
            } 
            />

            <Route exact path="/register" render={props => 
             !isAuthenticated ? (
              <Register {...props} setAuth={setAuth}/> 
              ) : 
              <Redirect to="/login" />
            } 
            />

            {/* if not authenticated go to login if authenticated go to dashboard*/}
            <Route exact path="/dashboard" render={props => 
              isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth}/> 
              ) : 
              <Redirect to="/login" /> 
            } 
            />
        </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
