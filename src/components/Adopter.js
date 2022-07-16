import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function Adopter({ adopter, onDelete }) { //Removed OnEdit (Use for UPDATE): , onEdit

    //Removed from <tr> (Use for UPDATE)
    /* 
            <td>< MdEdit onClick={() => 
                onEdit(exercise)}/>
            </td>
    */
    return (
        <tr>
            <td>{adopter.first_name}</td>
            <td>{adopter.last_name}</td>
            <td>{adopter.address}</td>
            <td>{adopter.phone_number}</td>
            <td>{adopter.email}</td>
            <td>{adopter.birth_date}</td>

            <td>< MdDeleteForever onClick={() => onDelete(adopter.id)}/></td>
        </tr>
    );
}

export default Adopter;