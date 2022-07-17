import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function IntakeRow({ intakes, onDelete }) {
    return (
        <tr>
            <td>{intakes.intake_id}</td>
            <td>{intakes.pet_id}</td>
            <td>{intakes.intake_date}</td>
            <td>{intakes.processor}</td>
            <td>{intakes.drop_off_type}</td>
            <td>{intakes.intake_details}</td>
            <td>< MdDeleteForever onClick={() => onDelete(intakes.intake_id)}/></td>
        </tr>
    );
}

export default IntakeRow;