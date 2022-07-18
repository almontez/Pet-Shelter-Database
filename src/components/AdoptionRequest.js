import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function AdoptionRequest({ adoption_request, onDelete, onEdit }) { //Removed OnEdit (Use for UPDATE): , onEdit

    //Removed from <tr> (Use for UPDATE)
    /* 
            <td>< MdEdit onClick={() => 
                onEdit(exercise)}/>
            </td>
    */
    return (
        <tr>
            <td>{adoption_request.adopter_pet_id}</td>
            <td>{adoption_request.adoption_request_id}</td>
            <td>{adoption_request.adopter_name}</td>
            <td>{adoption_request.pet_name}</td>
            <td>{adoption_request.processor}</td>
            <td>{adoption_request.request_date}</td>
            <td>{adoption_request.amount_paid}</td>
            <td>{adoption_request.status}</td>
            <td>< MdEdit onClick={() => onEdit(adoption_request)}/></td>
            <td>< MdDeleteForever onClick={() => onDelete(adoption_request.adopter_pet_id)}/></td>
        </tr>
    );
}

export default AdoptionRequest;