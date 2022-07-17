import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function PersonnelRow({ personnel, onDelete }) {
    return (
        <tr>
            <td>{personnel.pid}</td>
            <td>{personnel.ptype}</td>
            <td>{personnel.title}</td>
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