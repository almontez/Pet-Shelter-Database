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

// AdoptionRequestStatusCodes
import BrowseAdoptionRequestStatusCodesPage from './pages/BrowseAdoptionRequestStatusCodes';
import AddAdoptionRequestStatusCodePage from './pages/AddAdoptionRequestStatusCodePage';

// Adopters_Pets and AdoptionRequests
import BrowseAdoptionRequestsPage from './pages/BrowseAdoptionRequests';
import AddAdoptionRequestPage from './pages/AddAdoptionRequestPage';
import EditAdoptionRequestPage from './pages/EditAdoptionRequestPage';

//import EditEntityPage from './pages/EditEntityPage'; // Add this line for any entity that requires UPDATE functionality (Pets, AdoptionRequests)
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  // FOR UPDATE (applies to Pets and AdoptionRequests)
  const [adoptionRequestToEdit, setAdoptionRequestToEdit] = useState();

// Add a route like this for any page that requires UPDATE functionality (applies to Pets and AdoptionRequests)
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

          <Route path="/browse-adoption-request-status-codes">
            <BrowseAdoptionRequestStatusCodesPage />
          </Route>
          <Route path="/add-adoption-request-status-code">
            <AddAdoptionRequestStatusCodePage />
          </Route>

          <Route path="/browse-adoption-requests">
            <BrowseAdoptionRequestsPage setAdoptionRequestToEdit={setAdoptionRequestToEdit} />
          </Route>
          <Route path="/add-adoption-request">
            <AddAdoptionRequestPage />
          </Route>
          <Route path="/edit-adoption-request">
            <EditAdoptionRequestPage  adoptionRequestToEdit={adoptionRequestToEdit} />
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