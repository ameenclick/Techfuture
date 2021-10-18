import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { AppContext } from "./libs/ContextLib";
import Bubble from './components/BubbleChart';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
        <Router >
           <Switch>
             <Route path="/" exact>
               {/* {landing ? 
               <AppContext.Provider value={{landing}}> */}
               <LandingPage />
               {/* </AppContext.Provider> :""
               } */}
              </Route>
           </Switch>
        </Router>
    </div>
  );
}

export default App;
