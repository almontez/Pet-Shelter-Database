import React from 'react';
import PetsTable from '../components/PetsTable';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import petsData from '../data/petsData'; //sample data

function BrowsePetsPage({ setPetToEdit }) {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data

    const [pets, setPets] = useState([]);
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

    // Not currently working need to fix 
    // Code adapted from www.w3schools.com
    // Webpage: HOW TO - Filter/Search Table
    // Access Date: 07/17/2022
    const filterPets = async() => {
        const input = document.getElementById("petFilter");
        const filter = input.value.toUpperCase();
        const table = document.getElementById("pets-table");
        const tr = table.getElementsByTagName("tr");

        for (let i=0; i< tr.length; i++) {
            const td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
      };

    useEffect(() => {
        loadPets();
    }, []);

    return (
        <>
            <h2>List of Recorded Pets</h2>

            <Link to="/add-intake">Add New Pet</Link>
            <br></br>

            <input type="text" 
                   id="petFilter" 
                   onkeyup="filterPets()"
                   placeholder="Search for pet.."></input>

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