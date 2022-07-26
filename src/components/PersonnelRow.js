import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function PersonnelRow({ personnel, onDelete }) {
    return (
        <tr>
            <td>{personnel.personnel_id}</td>
            <td>{personnel.personnel_type}</td>
            <td>{personnel.job_title}</td>
            <td>{personnel.first_name}</td>
            <td>{personnel.last_name}</td>
            <td>{personnel.address}</td>
            <td>{personnel.phone_number}</td>
            <td>{personnel.email}</td>
            <td>{personnel.birth_date}</td>
            <td>< MdDeleteForever onClick={() => onDelete(personnel.id)}/></td>
        </tr>
    );
}

export default PersonnelRow;