import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link className="navigation-link" to="/">Home</Link>&nbsp;|&nbsp; 
            <Link className="navigation-link" to="/browse-pets">Pets</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adopters">Adopters</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-personnel">Personnel</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-intakes">Intakes</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/browse-adoption-requests">Adoption Requests</Link>&nbsp;|&nbsp;
            <Link className="navigation-link" to="/category-tables">Category Tables</Link>&nbsp;|&nbsp;
        </nav>
    );
}

export default Navigation;