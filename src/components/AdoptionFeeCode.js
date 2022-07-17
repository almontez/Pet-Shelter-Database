import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function AdoptionFeeCode({ adoption_fee_code, onDelete }) { //Removed OnEdit (Use for UPDATE): , onEdit

    //Removed from <tr> (Use for UPDATE)
    /* 
            <td>< MdEdit onClick={() => 
                onEdit(exercise)}/>
            </td>
    */
    return (
        <tr>
            <td>{adoption_fee_code.adoption_fee_id}</td>
            <td>{adoption_fee_code.code}</td>
            <td>{adoption_fee_code.fee}</td>
            <td>< MdDeleteForever onClick={() => onDelete(adoption_fee_code.adoption_fee_id)}/></td>
        </tr>
    );
}

export default AdoptionFeeCode;