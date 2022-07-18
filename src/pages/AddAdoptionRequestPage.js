import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddAdoptionRequestPage = () => {

    const [adopter_id, setAdopterId] = useState('');    // FK: requires drop down menu
    const [pet_id, setPetId] = useState('');    // FK: requires drop down menu
    const [processor, setProcessor] = useState(''); // FK: requires drop down menu
    const [request_date, setRequestDate] = useState('');
    const [amount_paid, setAmountPaid] = useState('');
    const [application_status, setApplicationStatus] = useState('');    // FK: requires drop down menu

//Used for setting default value for dropdown menu
    useEffect(() => {
        setAdopterId("1");
    }, []);

    const history = useHistory();

    const addAdoptionRequest = async (event) => {
        event.preventDefault();
        const newAdoptionRequest = { adopter_id, pet_id, processor, request_date, amount_paid, application_status };

        //DEBUG MESSAGE
        console.log(`Added a new adoption_request: ${JSON.stringify(newAdoptionRequest)}`)
        alert(`Added a new adoption_request: ${JSON.stringify(newAdoptionRequest)}`);

        // Makes a POST request to the server. SERVER CODE NOT IMPLEMENTED YET
        /*
        const response = await fetch('/adoption_requests', {
            method: 'POST',
            body: JSON.stringify(newAdoptionRequest),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the adoption_request!");
        } else {
            alert(`Failed to add adoption_request, status code = ${response.status}`);
        }
        */
        history.push("/browse-adoption-requests");
    };

    return (
        <form className="add-row" onSubmit={addAdoptionRequest}>
            <h1>Add New Adoption Request</h1>
            <fieldset className="add-row">
                <legend>Enter values for new adoption request</legend>
                <div className="add-row">
                    <label htmlFor="adopter_id_input">Adopter: </label>
                    <select id="adopter_id_input" type="number" value={adopter_id} onChange={e => setAdopterId(e.target.value)} required>
                        <option value="1">Angela Montez</option>
                        <option value="2">Benjamin Ling</option>
                        <option value="3">Sasha Howard</option>
                        <option value="4">Tim Smith</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="pet_id_input">Pet: </label>
                    <select id="pet_id_input" type="number" value={pet_id} onChange={e => setPetId(e.target.value)} required>
                        <option value="1">Cooper</option>
                        <option value="2">Elsa</option>
                        <option value="3">Stitch</option>
                        <option value="4">Poppy</option>
                        <option value="4">Hugh</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="processor_input">Processor: </label>
                    <select id="processor_input" type="number" value={processor} onChange={e => setProcessor(e.target.value)} required>
                        <option value="1">Muriel Rashn, Employee Full-Time</option>
                        <option value="2">Marie Cohnan, Employee Part-Time</option>
                        <option value="3">Vanna Tran, Volunteer - Cats</option>
                        <option value="4">Arthur Brooks, Volunteer- Cats</option>
                        <option value="4">Bobby Lee, Volunteer - Both</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="request_date_input">Request Date: </label>
                    <input
                        id="request_date_input"
                        type="text"
                        placeholder="Enter request date here"
                        value={request_date}
                        onChange={e => setRequestDate(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="amount_paid_input">Amount Paid: </label>
                    <input
                        id="amount_paid_input"
                        type="number"
                        placeholder="Enter amount paid here"
                        value={amount_paid}
                        onChange={e => setAmountPaid(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="application_status_input">Application Status: </label>
                    <select id="application_status_input" type="number" value={application_status} onChange={e => setApplicationStatus(e.target.value)} required>
                        <option value="1">Approved</option>
                        <option value="2">Under Review</option>
                        <option value="3">Denied</option>
                    </select>
                </div>
                <input type="submit" value="Add Adoption Request" />
            </fieldset>
        </form>
    );
}

export default AddAdoptionRequestPage;