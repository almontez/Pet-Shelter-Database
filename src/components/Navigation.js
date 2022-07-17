import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link className="navigation-link" to="/">Home</Link>&nbsp;|&nbsp; 
            <Link className="navigation-link" to="/browse-pets">Browse Pets</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adopters">Browse Adopters</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-personnel">Browse Personnel</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-fee-codes">Browse AdoptionFeeCodes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-request-status-codes">Browse AdoptionRequestStatusCodes</Link>&nbsp;|&nbsp;
        </nav>
    );
}

export default Navigation;