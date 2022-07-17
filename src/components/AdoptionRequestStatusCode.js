import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function AdoptionRequestStatusCode({ adoption_request_status_code, onDelete }) { //Removed OnEdit (Use for UPDATE): , onEdit

    //Removed from <tr> (Use for UPDATE)
    /* 
            <td>< MdEdit onClick={() => 
                onEdit(exercise)}/>
            </td>
    */
    return (
        <tr>
            <td>{adoption_request_status_code.adoption_request_status_id}</td>
            <td>{adoption_request_status_code.code}</td>
            <td>{adoption_request_status_code.status}</td>
            <td>< MdDeleteForever onClick={() => onDelete(adoption_request_status_code.adoption_request_status_id)}/></td>
        </tr>
    );
}

export default AdoptionRequestStatusCode;