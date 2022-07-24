import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CategoryTableLP from './pages/CategoryTablesLandingPage';

// Adopters
import BrowseAdoptersPage from './pages/BrowseAdopters';
import AddAdopterPage from './pages/AddAdopterPage';

// Pets
import BrowsePetsPage from './pages/BrowsePets';
import BrowsePetStatusesPage from './pages/BrowsePetStatuses'
import AddPetStatusesPage from './pages/AddPetStatuses';
import EditPetsPage from './pages/EditPetsPage';
import AddPetsPage from './pages/AddPet';

// Personnel
import BrowsePersonnelPage from './pages/BrowsePersonnel';
import BrowsePersonnelCodesPage from './pages/BrowsePersonnelTypeCodes';
import AddPersonnelPage from './pages/AddPersonnel';
import AddPersonnelCodesPage from './pages/AddPersonnelCodes';

// Intakes
import BrowseIntakesPage from './pages/BrowseIntakes';
import AddIntakesPage from './pages/AddIntake';

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

function App() {
  // FOR UPDATE (applies to Pets and AdoptionRequests)
  const [adoptionRequestToEdit, setAdoptionRequestToEdit] = useState();
  const [petToEdit, setPetToEdit] = useState();
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
            <BrowsePetsPage setPetToEdit={setPetToEdit} />
          </Route>
          <Route path="/add-pets" exact>
            <AddPetsPage />
          </Route>
          <Route path="/edit-pet">
            <EditPetsPage petToEdit={petToEdit} />
          </Route>
          <Route path="/browse-intakes" exact>
            <BrowseIntakesPage  />
          </Route>
          <Route path="/add-intake" exact>
            <AddIntakesPage  />
          </Route>
          <Route path="/browse-personnel" exact>
            <BrowsePersonnelPage  />
          </Route>
          <Route path="/add-personnel" exact>
            <AddPersonnelPage />
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
          <Route path="/browse-personnel-codes">
            <BrowsePersonnelCodesPage />
          </Route>
          <Route path="/add-personnel-codes">
            <AddPersonnelCodesPage />
          </Route>
          <Route path="/browse-pet-statuses">
            <BrowsePetStatusesPage />
          </Route>
          <Route path="/add-pet-status">
            <AddPetStatusesPage />
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
          <Route path="/category-tables-landing-page">
            <CategoryTableLP />
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