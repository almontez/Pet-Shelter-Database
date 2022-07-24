import React from 'react';
import { Link } from 'react-router-dom';
import PetStatusesTable from '../components/PetStatusesTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import petStatusesData from '../data/petStatusesData'; // SAMPLE DATA

function BrowsePetStatusesPage () {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data.

    const [pet_statuses, setPetStatuses] = useState([]);
    const history = useHistory();

    const onDelete = async(_id) => {
        alert(`Clicked Delete for Pet_status_id: ${_id}`);
    };

    const loadStatuses = async() => {
        const data = petStatusesData
        setPetStatuses(data)
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    return (
        <>
            <h2>List of Recorded Pet Statuses</h2>

            <Link to="/add-pet-status">Add New Pet Status</Link>

            <PetStatusesTable
                pet_statuses={pet_statuses}
                onDelete={onDelete}>
            </PetStatusesTable>

            <Link to="/category-tables">Return Category Tables</Link>
            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePetStatusesPage;