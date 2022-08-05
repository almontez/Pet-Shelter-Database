import React from "react";
import { Link } from 'react-router-dom';
import PetRow from './PetsRow'; 

function PetsTable({pets, onEdit, onDelete}) {
    return (
        <>
        <table id="pets-table">
            <caption><Link to="/add-intake">Add New Pet</Link></caption>
            <thead>
                <tr>
                    <th>Pet ID</th>
                    <th>Species</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Weight</th>
                    <th>Color</th>
                    <th>Adoption Status Code</th>
                    <th>Adoption Fee Type</th>
                    <th>Fee</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {pets.map((pet, i) => <PetRow pet={pet}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={i}/>)}
            </tbody>
        </table>
        </>
    )
} 

export default PetsTable;