import React from 'react';
import { Link } from 'react-router-dom';
import PetStatusesRow from './PetStatusesRow';

function PetStatusesTable ({ pet_statuses, onDelete }) {
    return (
        <table>
            <caption><Link to="/add-pet-status">Add New Pet Status</Link></caption>
            <thead>
                <tr>
                    <th>Pet Status ID</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {pet_statuses.map((status, i) => <PetStatusesRow pet_statuses={status}
                    onDelete={onDelete}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default PetStatusesTable;