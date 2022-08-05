import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionRequestStatusCode from './AdoptionRequestStatusCode';

//Removed from <thead>. Use for entities that need UPDATE
//  <th>Edit</th>

//Removed from <tbody>. Use for entities that need UPDATE
//                      onEdit={onEdit}

function AdoptionRequestStatusCodeList({ adoption_request_status_codes, onDelete }) { //Removed onEdit (use for UPDATE), onEdit

    //DEBUG
    console.log(`adoption_request_status_codes data in AdoptionRequestStatusCodesList: ${JSON.stringify(adoption_request_status_codes)}`);
    
    return (
        <table id="adoption_request_status_codes">
            <caption><Link className="navigation-link" to="/add-adoption-request-status-code">Add New Adoption Request Status Code</Link></caption>
            <thead>
                <tr>
                    <th>AdoptionRequestStatus ID</th>
                    <th>Code</th>
                    <th>Request Status</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {adoption_request_status_codes.map((adoption_request_status_code, i) => <AdoptionRequestStatusCode adoption_request_status_code={adoption_request_status_code}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default AdoptionRequestStatusCodeList;
