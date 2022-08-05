import React from 'react';
import { Link } from 'react-router-dom';
import PersonnelCodesRow from './PersonnelCodesRow';

function PersonnelCodesTable ({ personnel_codes, onDelete }) {
    return (
        <table>
            <caption><Link to="/add-personnel-codes">Add New Personnel Code</Link></caption>
            <thead>
                <tr>
                    <th>Personnel Code ID</th>
                    <th>Code</th>
                    <th>Personnel Type Description</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {personnel_codes.map((code, i) => <PersonnelCodesRow personnel_codes={code}
                    onDelete={onDelete}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default PersonnelCodesTable;