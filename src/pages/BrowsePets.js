import React from 'react';
import PetsTable from '../components/PetsTable';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
//import petsData from '../data/petsData'; // sample data

function BrowsePetsPage({ setPetToEdit }) {
    // data container for dropdown menu in filter
    const [attributeDropDownList, setAttributeDropDownList] = useState([]);

    // data container for search/filter functionalities
    const [attribute, setAttribute] = useState([]);
    const [search, setSearch] = useState([]);
    
    // data containers for pet information
    const [pets, setPets] = useState([]);

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
        event.preventDefault();

        const response = await fetch(`/pets-filter/${attribute}/${search}`);
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

    // resets the table 
    const resetPage = async( event ) => {
        event.preventDefault();

        // fetch Pets data [from DB] using READ route in server.js  
        const response = await fetch('/pets');
        const data = await response.json();

        // load data into pets variable
        setPets(data);
    };

    const loadAttributeDropDownList = async () => {
        // Fetch Personnel data from server
        let response = await fetch('/attribute-dropdown-list');
        let data = await response.json();

        // load adoption fee type data into dropdown container
        setAttributeDropDownList(data);
    };

    // Citation for following code block
    // Date: 7/23/2022
    // Adapted from:
    // Source URL: https://stackoverflow.com/a/53572588/5715461
    const loadDropDownLists = useCallback(async () => {
        await loadAttributeDropDownList();
    }, []);

    useEffect(() => {
        // load all pets data into UI table
        loadPets();
        loadDropDownLists();
    }, []);

    return (
        <>
            <h2>List of Recorded Pets</h2>

            <form className="petFilter" id='petFilter' onSubmit={filterPets}> 
                <div className='search-bar'>
                    <label>Search: </label>
                    <input type="text"
                        value={String(search)}
                        onChange = {e => setSearch(e.target.value)} 
                        placeholder="Search for pet by breed"/>
                    <label htmlFor="filter"> Filter By:  </label>
                        <select id="filter" type="text" value={attribute} onChange={e => setAttribute(e.target.value)} required>
                            <option value="0">Select Search Attribute</option>
                            {
                                attributeDropDownList.map( (data, i) =>
                                <option key={data.Column_name}
                                        value={data.Column_name}>
                                        {data.Column_name}</option>)
                            }
                        </select>
                    <input type="submit" value="Search" />
                    <button id='reset-bttn' onClick={resetPage}>Clear Search</button>
                </div>
            </form>
            <br></br>
                        
            <PetsTable                 
                pets={pets}
                onEdit={onEdit}
                onDelete={onDelete}>
            </PetsTable>

            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePetsPage;