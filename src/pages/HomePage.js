import React from 'react';
import { Link } from 'react-router-dom';
//import { useState, useEffect } from 'react'; // not currently used here

function BrowseAdoptersPage({ setExerciseToEdit }) {

    return (
        <>
          <h2>Home Page For Pet Shelter Database Manager</h2>
          <div className="App-content">
            <p>
              Please select a table to manage!
            </p>
            <div> 
              <Link className="App-link" to="/browse-pets">
                Browse Pets
              </Link>
            </div>
            <div>
              <Link className="App-link" to="/browse-adopters">
                Browse Adopters
              </Link>
            </div>
            <div>
              <Link className="App-link" to="/browse-personnel">
                Browse Personnel
              </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-requests">
                  Browse AdoptionRequests
                </Link>
            </div>
            <div>
              <Link className="App-link" to="/manage-category-tables">
                Manage Category Tables (Goes to Category Tables landing page)
              </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-fee-codes">
                  Browse AdoptionFeeCodes
                </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-request-status-codes">
                  Browse AdoptionRequestStatusCodes
                </Link>
            </div>
          </div>
        </>
    );
}

export default BrowseAdoptersPage;