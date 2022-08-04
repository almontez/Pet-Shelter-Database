import React from 'react';
import PetsTable from '../components/PetsTable';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import petsData from '../data/petsData'; // sample data

function BrowsePetsPage({ setPetToEdit }) {
    
    // data containers for pet information
    const [pets, setPets] = useState([]);
    const [breedSearch, setBreedSearch] = useState([]);

    const history = useHistory();

    // Remove Pet instance from Pets Table
    const onDelete = async(_id) => {
        // Get pet_id from delete route in server.js
        const response = await fetch('/pets', {
            method: 'DELETE',
            body: JSON.stringify({pet_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // For the record: Request Successfully Fulfilled
            console.log(`Status Code: ${response.status}. Deleting Pet with id = ${_id}`);

            // Generate new pets list for table
            const newPetList = pets.filter(m => m.pet_id !== _id);
            setPets(newPetList);
        } else {
            // Log error
            console.error(`Status Code: ${response.status}. Failed to delete Pet with id = ${_id}`);
        }
    }; 

    // Edit/Update Pet information 
    const onEdit = async petToEdit => {
        setPetToEdit(petToEdit);
        history.push("/edit-pet")
    };

    // Filter Pets by Breed
    const filterPets = async(event) => {
        event.preventDefault()

        const response = await fetch(`/pets-filter/${breedSearch}`);
        const data = await response.json();

        setPets(data);
    }; 

    // Populate UI table with pet data
    const loadPets = async() => {
        // fetch Pets data [from DB] using READ route in server.js  
        const response = await fetch('/pets');
        const data = await response.json();

        // load data into pets variable
        setPets(data);
    };

    useEffect(() => {
        // load all pets data into UI table
        loadPets();
    }, []);

    return (
        <>
            <h2>List of Recorded Pets</h2>

            <form className="petFilter" id='petFilter' onSubmit={filterPets}> 
                <input type="text"
                       value={String(breedSearch)}
                       onChange = {e => setBreedSearch(e.target.value)} 
                       placeholder="Search for pet by breed"/>
                <input type="submit" value="Search" />
            </form>
            <br></br>

            <Link to="/add-intake">Add New Pet</Link>

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