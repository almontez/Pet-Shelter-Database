import React from 'react';
import PersonnelRow from './PersonnelRow';

function PersonnelTable( { personnel, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Personnel Type</th>
                    <th>Job Title</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {personnel.map((personnel, i) => <PersonnelRow personnel={personnel}
                    onDelete={onDelete}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default PersonnelTable;