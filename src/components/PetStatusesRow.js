import React from 'react';
import { MdDeleteForever } from 'react-icons/md'

function PetStatusesRow({ pet_statuses, onDelete }) {
    return (
        <tr>
            <td>{pet_statuses.ps_id}</td>
            <td>{pet_statuses.code}</td>
            <td>{pet_statuses.status}</td>
            <td>< MdDeleteForever onClick={() => onDelete(pet_statuses.ps_id)}/></td>
        </tr>
    );
}

export default PetStatusesRow;