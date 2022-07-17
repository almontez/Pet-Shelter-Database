import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';

// Adopters
import BrowseAdoptersPage from './pages/BrowseAdopters';
import AddAdopterPage from './pages/AddAdopterPage';

// Pets
import BrowsePetsPage from './pages/BrowsePets';
import BrowsePetStatusesPage from './pages/BrowsePetStatuses'

// Personnel
import BrowsePersonnelPage from './pages/BrowsePersonnel';
import BrowsePersonnelCodesPage from './pages/BrowsePersonnelTypeCodes';

// Intakes
import BrowseIntakesPage from './pages/BrowseIntakes';
import AddIntakePage from './pages/AddIntake';

// Adopters_Pets and AdoptionRequests
import BrowseAdoptionRequestsPage from './pages/BrowseAdoptionRequests';
import AddAdoptionRequestPage from './pages/AddAdoptionRequestPage';
import EditAdoptionRequestPage from './pages/EditAdoptionRequestPage';

//import EditEntityPage from './pages/EditEntityPage'; // Add this line for any entity that requires UPDATE functionality (Pets, AdoptionRequests)

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
        <h1>Pet Shelter Database</h1>
        <p>Description</p>
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
          <Route path="/browse-pets" exact>
            <BrowsePetsPage  />
          </Route>
          <Route path="/browse-personnel" exact>
            <BrowsePersonnelPage  />
          </Route>
          <Route path="/browse-intakes" exact>
            <BrowseIntakesPage  />
          </Route>
          <Route path="/add-intake" exact>
            <AddIntakePage  />
          </Route>
          <Route path="/browse-adoption-requests">
            <BrowseAdoptionRequestsPage setAdoptionRequestToEdit={setAdoptionRequestToEdit} />
          </Route>
          <Route path="/browse-personnel-codes">
            <BrowsePersonnelCodesPage />
          </Route>
          <Route path="/browse-pet-statuses">
            <BrowsePetStatusesPage />
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