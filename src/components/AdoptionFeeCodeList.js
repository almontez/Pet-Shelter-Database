import React from 'react';
import AdoptionFeeCode from './AdoptionFeeCode';

//Removed from <thead>. Use for entities that need UPDATE
//  <th>Edit</th>

//Removed from <tbody>. Use for entities that need UPDATE
//                      onEdit={onEdit}

function AdoptionFeeCodeList({ adoption_fee_codes, onDelete }) { //Removed onEdit (use for UPDATE), onEdit

    //DEBUG
    console.log(`adoption_fee_codes data in AdoptionFeeCodesList: ${JSON.stringify(adoption_fee_codes)}`);
    
    return (
        <table id="adoption_fee_codes">
            <thead>
                <tr>
                    <th>AdoptionFee ID</th>
                    <th>Code</th>
                    <th>Fee</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {adoption_fee_codes.map((adoption_fee_code, i) => <AdoptionFeeCode adoption_fee_code={adoption_fee_code}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default AdoptionFeeCodeList;
