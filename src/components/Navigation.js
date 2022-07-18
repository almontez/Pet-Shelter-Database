import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link className="navigation-link" to="/">Home</Link>&nbsp;|&nbsp; 
            <Link className="navigation-link" to="/browse-pets">Browse Pets</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adopters">Browse Adopters</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-personnel">Browse Personnel</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-intakes">Browse Intakes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-requests">Browse Adoption Requests</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-fee-codes">Browse Adoption Fee Codes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-request-status-codes">Browse Adoption Request Status Codes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-personnel-codes">Browse Personnel Codes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-pet-statuses">Browse Pet Statuses</Link>&nbsp;|&nbsp;
        </nav>
    );
}

export default Navigation;