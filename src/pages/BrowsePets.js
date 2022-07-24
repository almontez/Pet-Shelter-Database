import React from 'react';
import PetsTable from '../components/PetsTable';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import petsData from '../data/petsData'; //sample data
import PetFilter from '../components/PetFilter';

function BrowsePetsPage({ setPetToEdit }) {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data

    const [pets, setPets] = useState([]);
    const [filter, setFilter] = useState([]);
    const history = useHistory();

    const onDelete = async(_id) => {
        alert(`Clicked Delete for Pet_id: ${_id}`);
    }; 

    const onEdit = async petToEdit => {
        setPetToEdit(petToEdit);
        history.push("/edit-pet")
    };

    const loadPets = async() => {
        const data = petsData
        setPets(data)
    };

    useEffect(() => {
        loadPets();
    }, []);

    return (
        <>
            <h2>List of Recorded Pets</h2>

            <PetFilter></PetFilter>
            <br></br>

            <Link to="/add-pets">Add New Pet</Link>

            <PetsTable                 
                pets={pets}
                onEdit={onEdit}
                onDelete={onDelete}>
            </PetsTable>

            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePetsPage;