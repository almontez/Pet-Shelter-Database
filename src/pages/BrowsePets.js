import React from 'react';
import PetsTable from '../components/PetsTable';
import { Link } from 'react-router-dom';

function BrowsePetsPage({ setPetToEdit }) {
    // TODO: ADD JS CODE 

    return (
        <>
            <h2>List of Recorded Pets</h2>

            <Link to="/add-pet">Add New Pet</Link>

            <PetsTable></PetsTable>
                {/* Need to add JS code and sample data to PetsTable
                pets={pets}
                onEdit={onEdit}
                onDelete={onDelete}*/}
 
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePetsPage;