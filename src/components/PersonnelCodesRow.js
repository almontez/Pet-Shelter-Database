import React from 'react';
import { MdDeleteForever } from 'react-icons/md'

function PersonnelCodesRow({ personnel_codes, onDelete }) {
    return (
        <tr>
            <td>{personnel_codes.personnel_type_id}</td>
            <td>{personnel_codes.code}</td>
            <td>{personnel_codes.personnel_type}</td>
            <td>< MdDeleteForever onClick={() => onDelete(personnel_codes.personnel_type_id)}/></td>
        </tr>
    );
}

export default PersonnelCodesRow;