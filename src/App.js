import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Adopters
import BrowseAdoptersPage from './pages/BrowseAdopters';
import AddAdopterPage from './pages/AddAdopterPage';

// AdoptionFeeCodes
import BrowseAdoptionFeeCodesPage from './pages/BrowseAdoptionFeeCodes';
import AddAdoptionFeeCodePage from './pages/AddAdoptionFeeCodePage';

//import EditEntityrPage from './pages/EditEntityPage'; // Add this line for any entity that requires UPDATE functionality (Pets, AdoptionRequests)
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
// This could either go in App.js or BrowseEntity page for a particular entity. I'm still figuring this part out to see which is best.
/*
  const [exerciseToEdit, setExerciseToEdit] = useState();
*/


// Add a route like this for any page that requires UPDATE functionality (Pets, AdoptionRequests)
/* 
<Route path="/edit-exercise">
  <EditEntityPage  />
</Route> 
*/

  console.log("Hello World");

  return (
    <div className="App">
      <header>
        <h1>Pel Shelter Database UI</h1>
        <p>Full Stack MERN app for managing the pet shelter database</p>
      </header>
      <Router>
        <Navigation/>
        <div className="App-header">  
          <Route path="/" exact>
            <HomePage  />
          </Route>
          <Route path="/browse-adopters" exact>
            <BrowseAdoptersPage  />
          </Route>
          <Route path="/add-adopter">
            <AddAdopterPage />
          </Route>

          <Route path="/browse-adoption-fee-codes">
            <BrowseAdoptionFeeCodesPage />
          </Route>
          <Route path="/add-adoption-fee-code">
            <AddAdoptionFeeCodePage />
          </Route>
        </div>
      </Router>
      <footer>
        <p> © 2022 Benjamin Ling and Angela Montez</p>
      </footer>
    </div>
  );
}

export default App;