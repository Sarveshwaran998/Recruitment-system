import './App.css';
import React, {useEffect} from "react";
import Home from './Home.js';
import Login from './Login.js';
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Appquiz from './Component/components/quiz/Appquiz';
import Dashboard from './Dashboard/Dashboard';
import ResumeUpload from './Dashboard/ResumeUpload.js';
import Vhub from './Vhub/Vhub';


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
      <Route path="/ResumeUpload">
        <ResumeUpload/>
      </Route>
      <Route path="/Vhub">
        <Vhub/>
      </Route>
      <Route path="/Dashboard">
        <Dashboard />
      </Route>
       <Route path="/Quiz/:id/:id1/:id2/:id3/:id4/:id5">
        <Appquiz />
      </Route>
      <Route path="/Home">
      <Home />
      </Route>
        <Route path = "/">
          <Login />
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
