import React from 'react';
import { Link } from 'react-router-dom';
//import { useState, useEffect } from 'react'; // not currently used here

function HomePage() {

    return (
        <>
          <h2>Home Page For Pet Shelter Database Manager</h2>
          <div className="App-content">
            <p>
              Please select a table to manage!
            </p>
            <h3>Entity Tables:</h3>
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
              <Link className="App-link" to="/browse-intakes">
                Browse Intakes
              </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-requests">
                  Browse AdoptionRequests
                </Link>
            </div>
            <h3>Category Tables:</h3>
            {/* <div>              
              <Link className="App-link" to="/category-tables-landing-page">
                View Category Tables
              </Link>
            </div> */}
            <div>
                <Link className="App-link" to="/browse-personnel-codes">
                  Browse Personnel Codes
                </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-pet-statuses">
                  Browse Pet Statuses
                </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-fee-codes">
                  Browse Adoption Fee Codes
                </Link>
            </div>
            <div>
                <Link className="App-link" to="/browse-adoption-request-status-codes">
                  Browse Adoption Request Status Codes
                </Link>
            </div>
          </div>
        </>
    );
}

export default HomePage;