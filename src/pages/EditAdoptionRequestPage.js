import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditAdoptionRequestPage = ({ adoptionRequestToEdit }) => {
    // DEBUG MESSAGE
    // const debug_message = `EditAdoptionRequestPage: Editing an Adoption Request: ${JSON.stringify(adoptionRequestToEdit)}`;
    // console.log(debug_message);
    // alert(debug_message);

    const [adopter_id, setAdopterId] = useState(adoptionRequestToEdit.adopter_id);    // updated in Adopter_Pets
    const [pet_id, setPetId] = useState(adoptionRequestToEdit.pet_id);            // updated in Adopter_Pets
    const [processor, setProcessor] = useState(adoptionRequestToEdit.processor);     // updated in AdoptionRequests
    const [request_date, setRequestDate] = useState(adoptionRequestToEdit.request_date);               // updated in AdoptionRequests
    const [amount_paid, setAmountPaid] = useState(adoptionRequestToEdit.amount_paid);               // updated in AdoptionRequests
    const [application_status, setApplicationStatus] = useState(adoptionRequestToEdit.adoption_request_status_id);               // updated in AdoptionRequests

    const history = useHistory();

    const editAdoptionRequest = async () => {
        const editedAdoptionRequest = { adopter_id: adopter_id, pet_id: pet_id, processor: processor, request_date: request_date, amount_paid: amount_paid, application_status: application_status };
        
        //DEBUG MESSAGE
        console.log(`Edited an adoption_request: ${JSON.stringify(editedAdoptionRequest)}`)
        alert(`Edited a an adoption_request: ${JSON.stringify(editedAdoptionRequest)}`);

        // Server code TO BE IMPLEMENTED. For now just display helpful debug message to verify input.
        /*
        const response = await fetch(`/exercises/${adoptionRequestToEdit.adoption_request_id}`, {
            method: 'PUT',
            body: JSON.stringify(editedAdoptionRequest),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the AdoptionRequest!");
        } else {
             alert(`Failed to edit AdoptionRequest, status code = ${response.status}`);
        }     
        */
        history.push("/browse-adoption-requests");
    };

    return (
        <div className="edit-page">
            <h1>Edit Exercise</h1>
            <div className="edit-row">
                <label id="edit-adopter-id-label" htmlFor="adopter_id_input">Adopter</label>
                <select id="adopter_id_input" type="number" value={String(adopter_id)} onChange={e => setAdopterId(e.target.value)} required>
                    <option value="1">Angela Montez</option>
                    <option value="2">Benjamin Ling</option>
                    <option value="3">Sasha Howard</option>
                    <option value="4">Tim Smith</option>
                </select>
            </div>
            <div className="edit-row">
                <label id="edit-pet-id-label" htmlFor="pet_id_input">Pet</label>
                <select id="adopter_id_input" type="number" value={String(pet_id)} onChange={e => setPetId(e.target.value)} required>
                    <option value="1">Cooper</option>
                    <option value="2">Elsa</option>
                    <option value="3">Stitch</option>
                    <option value="4">Poppy</option>
                    <option value="5">Hugh</option>
                </select>
            </div>
            <div className="edit-row">
                <label id="edit-processor-label" htmlFor="processor_input">Processor</label>
                <select id="processor_input" type="number" value={String(processor)} onChange={e => setProcessor(e.target.value)} required>
                <option value="1">Muriel Rashn, Employee Full-Time</option>
                    <option value="2">Marie Cohnan, Employee Part-Time</option>
                    <option value="3">Vanna Tran, Volunteer - Cats</option>
                    <option value="4">Arthur Brooks, Volunteer- Cats</option>
                    <option value="5">Bobby Lee, Volunteer - Both</option>
                </select>
            </div>           
            <div className="edit-row">
                <label htmlFor="request_date_input">Request Date</label>
                <input
                    id="request_date_input"
                    type="text"
                    value={request_date}
                    onChange={e => setRequestDate(e.target.value)} />
            </div>
            <div className="edit-row">
                <label htmlFor="amount_paid_input">Amount Paid</label>
                <input
                    id="amount_paid_input"
                    type="number"
                    value={amount_paid}
                    onChange={e => setAmountPaid(parseInt(e.target.value))} />
            </div>          
            <div className="edit-row">
                <label id="edit-application-status-label" htmlFor="application_status_input">Application Status</label>
                <select id="application_status_input" type="number" value={String(application_status)} onChange={e => setApplicationStatus(e.target.value)} required>
                    <option value="1">Approved</option>
                    <option value="2">Under Review</option>
                    <option value="3">Denied</option>
                </select>
            </div>
            <button id="save-button" onClick={editAdoptionRequest}>Save</button>
        </div>
    );
}

export default EditAdoptionRequestPage;