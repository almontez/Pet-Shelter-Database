import React from 'react';
import PetStatusesRow from './PetStatusesRow';

function PetStatusesTable ({ pet_statuses, onDelete }) {
    return (
        <table>
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