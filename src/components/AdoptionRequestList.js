import React from 'react';
import AdoptionRequest from './AdoptionRequest';

//Removed from <thead>. Use for entities that need UPDATE
//  <th>Edit</th>

//Removed from <tbody>. Use for entities that need UPDATE
//                      onEdit={onEdit}

function AdoptionRequestList({ adoption_requests, onDelete, onEdit }) { //Removed onEdit (use for UPDATE), onEdit

    //DEBUG
    console.log(`adoption_requests data in AdoptionRequestsList: ${JSON.stringify(adoption_requests)}`);
    
    return (
        <table id="adoption_requests">
            <thead>
                <tr>
                    <th>Adopter Pet ID</th>
                    <th>Adoption Request ID</th>
                    <th>Adopter Name</th>
                    <th>Pet Name</th>
                    <th>Processor</th>
                    <th>Request Date</th>
                    <th>Amount Paid</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {adoption_requests.map((adoption_request, i) => <AdoptionRequest adoption_request={adoption_request}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default AdoptionRequestList;
