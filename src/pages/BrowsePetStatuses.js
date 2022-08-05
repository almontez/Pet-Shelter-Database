import React from 'react';
import { Link } from 'react-router-dom';
import PetStatusesTable from '../components/PetStatusesTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import petStatusesData from '../data/petStatusesData'; // SAMPLE DATA

function BrowsePetStatusesPage () {
    
    // DESCRIBE ME
    const [pet_statuses, setPetStatuses] = useState([]);
    const history = useHistory();

    // Remove PetStatus instance from PetStatuses Table
    const onDelete = async(_id) => {
        // Get pet_status_id from delete route in server.js
        const response = await fetch('/pet-statuses', {
            method: 'DELETE',
            body: JSON.stringify({pet_status_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // For the record: Request Successfully Fulfilled
            console.log(`Status Code: ${response.status}. Deleting Pet Status with id = ${_id}`);

            // Generate new pets list for table
            const newPetStatusesList = pet_statuses.filter(m => m.pet_status_id !== _id);
            setPetStatuses(newPetStatusesList);
        } else {
            // For the record: Log error
            console.error(`Status Code: ${response.status}. Failed to delete Pet Status with id = ${_id}`);
        }
    }; 

    const loadStatuses = async() => {
        // fetch PetStatuses data [from DB] using READ route in server.js  
        const response = await fetch('/pet-statuses');
        const data = await response.json();
        
        // load data into pet_statuses variable
        setPetStatuses(data)
    };

    useEffect(() => {
        // load all pet statuses data into UI table
        loadStatuses();
    }, []);

    return (
        <>
            <h2>List of Recorded Pet Statuses</h2>

            <PetStatusesTable
                pet_statuses={pet_statuses}
                onDelete={onDelete}>
            </PetStatusesTable>
            <br></br>
            <Link to="/category-tables">Return Category Tables</Link>
            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePetStatusesPage;