import './App.css';
import React, {useEffect} from "react";
import Home from './Home.js';
import Login from './Login.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{},dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      if(authUser){
        // the user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })       
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path = "/Login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
