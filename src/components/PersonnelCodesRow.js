import React from 'react';
import { MdDeleteForever } from 'react-icons/md'

function PersonnelCodesRow({ personnel_codes, onDelete }) {
    return (
        <tr>
            <td>{personnel_codes.pt_id}</td>
            <td>{personnel_codes.code}</td>
            <td>{personnel_codes.description}</td>
            <td>< MdDeleteForever onClick={() => onDelete(personnel_codes.pt_id)}/></td>
        </tr>
    );
}

export default PersonnelCodesRow;