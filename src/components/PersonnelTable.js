import React from 'react';
import PersonnelRow from './PersonnelRow';

function PersonnelTable( { personnel, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Personnel ID</th>
                    <th>Personnel Type Code</th>
                    <th>Job Title</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Birthday</th>
                    <th>Delete</th>
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