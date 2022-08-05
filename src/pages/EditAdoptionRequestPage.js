import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";

export const EditAdoptionRequestPage = ({ adoptionRequestToEdit }) => {
    // DEBUG MESSAGE
    // const debug_message = `EditAdoptionRequestPage: Editing an Adoption Request: ${JSON.stringify(adoptionRequestToEdit)}`;
    // console.log(debug_message);
    // alert(debug_message);

    // Data for dropdown menus
    const [adopterDropDownList, setAdopterDropDownList] = useState([]);
    const [petDropDownList, setPetDropDownList] = useState([]);
    const [personnelDropDownList, setPersonnelDropDownList] = useState([]);
    const [requestStatusDropDownList, setRequestStatusDropDownList] = useState([]);

    // Data for submission
    const [adopter_id, setAdopterId] = useState(adoptionRequestToEdit.adopter_id);    // updated in Adopter_Pets
    const [pet_id, setPetId] = useState(adoptionRequestToEdit.pet_id);            // updated in Adopter_Pets
    const [processor, setProcessor] = useState(adoptionRequestToEdit.personnel_id);     // updated in AdoptionRequests
    const [request_date, setRequestDate] = useState(adoptionRequestToEdit.request_date);               // updated in AdoptionRequests
    const [amount_paid, setAmountPaid] = useState(adoptionRequestToEdit.amount_paid);               // updated in AdoptionRequests
    const [application_status, setApplicationStatus] = useState(adoptionRequestToEdit.adoption_request_status_id);               // updated in AdoptionRequests

    const history = useHistory();

    const editAdoptionRequest = async () => {

        let processorToBeSubmitted = processor;
        let amountPaidToBeSubmitted = amount_paid;

        // Capture 0 or ZLS values and replace them with null
        //console.log(`processor in addAdoptionRequest: ${processor}`);
        //console.log(`amount_paid in addAdoptionRequest: ${amount_paid}`);
        if (processor === "0" || processor === null) {
            //setProcessor(null);
            processorToBeSubmitted = null;
            console.log(`attempted to set null on processor: ${processor}`);
        }
        if (amount_paid === "" || amount_paid === null) {
            //setAmountPaid(null);
            amountPaidToBeSubmitted = null;
            console.log(`amount_paid is ZLS or null: ${amount_paid}`);
        }

        const editedAdoptionRequest = { adopter_pet_id: adoptionRequestToEdit.adopter_pet_id, adoption_request_id: adoptionRequestToEdit.adoption_request_id, adopter_id: adopter_id, pet_id: pet_id, processor: processorToBeSubmitted, request_date: request_date, amount_paid: amountPaidToBeSubmitted, application_status: application_status };
        
        //DEBUG MESSAGE
        console.log(`Edited an adoption_request: ${JSON.stringify(editedAdoptionRequest)}`)
        alert(`Edited a an adoption_request: ${JSON.stringify(editedAdoptionRequest)}`);

        // Server code TO BE IMPLEMENTED. For now just display helpful debug message to verify input.
        const response = await fetch(`/adoption-request`, {
            method: 'PUT',
            body: JSON.stringify(editedAdoptionRequest), // /${adoptionRequestToEdit.adoption_request_id}
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the AdoptionRequest!");
        } else {
             alert(`Failed to edit AdoptionRequest, status code = ${response.status}`);
        }     
        
        history.push("/browse-adoption-requests");
    };

    const loadAdopterDropDownList = async () => {
        // Fetch adopter dropdown list data from the server
        let response = await fetch('/adopter-dropdown-list');
        let data = await response.json();
        //console.log(`loadAdopterDropDownList data: ${JSON.stringify(data)}`);
        setAdopterDropDownList(data);
    };

    const loadPetDropDownList = async () => {
        // Fetch adopter dropdown list data from the server
        let response = await fetch('/pet-dropdown-list');
        let data = await response.json();
        //console.log(`loadPetDropDownList data: ${JSON.stringify(data)}`);
        setPetDropDownList(data);
    };

    const loadPersonnelDropDownList = async () => {
        // Fetch adopter dropdown list data from the server
        let response = await fetch('/personnel-dropdown-list');
        let data = await response.json();
        //console.log(`loadPersonnelDropDownList data: ${JSON.stringify(data)}`);
        setPersonnelDropDownList(data);
    };

    const loadRequestStatusDropDownList = async () => {
        // Fetch adopter dropdown list data from the server
        let response = await fetch('/adoption-request-status-dropdown-list');
        let data = await response.json();
        //console.log(`loadRequestStatusDropDownList data: ${JSON.stringify(data)}`);
        setRequestStatusDropDownList(data);
    };
    
    // Citation for following code block
    // Date: 7/23/2022
    // Adapted from:
    // Source URL: https://stackoverflow.com/a/53572588/5715461
      const loadDropDownLists = useCallback(async () => {
        await loadAdopterDropDownList();
        await loadPetDropDownList();
        await loadPersonnelDropDownList();
        await loadRequestStatusDropDownList();
    }, []);

    useEffect(() => {
        loadDropDownLists();
    }, []);

    console.log(`adoptionRequestToEdit in EditAdoptionRequestPage: ${JSON.stringify(adoptionRequestToEdit)}`);

    return (
        <div className="edit-page">
            <h1>Edit Adoption Request</h1>
            <fieldset>
            <legend>Enter updates for selected adoption request</legend>
            <div className="edit-row">
                <label id="edit-adopter-id-label" htmlFor="adopter_id_input">Adopter: </label>
                <select id="adopter_id_input" type="number" value={String(adopter_id)} onChange={e => setAdopterId(e.target.value)} required>
                    <option value="">-- Please select an Adopter --</option>
                    {
                        adopterDropDownList.map( (row, i) => 
                        <option key={i} value={row.adopter_id}>{row.adopter_name}</option> )
                    }
                    {/* <option value="1">Angela Montez</option>
                    <option value="2">Benjamin Ling</option>
                    <option value="3">Sasha Howard</option>
                    <option value="4">Tim Smith</option> */}
                </select>
            </div>
            <div className="edit-row">
                <label id="edit-pet-id-label" htmlFor="pet_id_input">Pet: </label>
                <select id="adopter_id_input" type="number" value={String(pet_id)} onChange={e => setPetId(e.target.value)} required>
                    <option value="">-- Please select a Pet --</option>
                    {
                        petDropDownList.map( (data, i) => 
                        <option key={data.pet_id} value={data.pet_id}>{data.pet_name}</option> )
                    }
                    {/* <option value="1">Cooper</option>
                    <option value="2">Elsa</option>
                    <option value="3">Stitch</option>
                    <option value="4">Poppy</option>
                    <option value="5">Hugh</option> */}
                </select>
            </div>
            <div className="edit-row">
                <label id="edit-processor-label" htmlFor="processor_input">Processor: </label>
                <select id="processor_input" type="number" value={String(processor)} onChange={e => setProcessor(e.target.value)} required>
                    <option value="">-- Please select a Processor --</option>
                    <option value="0">NULL</option>
                    {
                        personnelDropDownList.map( (data, i) => 
                        <option key={data.personnel_id} value={data.personnel_id}>{data.personnel_name}</option> )
                    }
                    {/* <option value="1">Muriel Rashn, Employee Full-Time</option>
                    <option value="2">Marie Cohnan, Employee Part-Time</option>
                    <option value="3">Vanna Tran, Volunteer - Cats</option>
                    <option value="4">Arthur Brooks, Volunteer- Cats</option>
                    <option value="5">Bobby Lee, Volunteer - Both</option> */}
                </select>
            </div>           
            <div className="edit-row">
                <label htmlFor="request_date_input">Request Date: </label>
                <input
                    id="request_date_input"
                    type="date"
                    value={request_date} //"2018-07-22"//{request_date}
                    onChange={e => setRequestDate(e.target.value)} />
            </div>
            <div className="edit-row">
                <label htmlFor="amount_paid_input">Amount Paid: </label>
                <input
                    id="amount_paid_input"
                    type="number"
                    value={amount_paid}
                    onChange={e => setAmountPaid(parseInt(e.target.value))} />
            </div>          
            <div className="edit-row">
                <label id="edit-application-status-label" htmlFor="application_status_input">Application Status: </label>
                <select id="application_status_input" type="number" value={String(application_status)} onChange={e => setApplicationStatus(e.target.value)} required>
                    <option value="">-- Please select a request status --</option>
                    {
                        requestStatusDropDownList.map( (data, i) => 
                        <option key={data.adoption_request_status_id} value={data.adoption_request_status_id}>{data.request_status}</option> )
                    }
                    {/* <option value="1">Approved</option>
                    <option value="2">Under Review</option>
                    <option value="3">Denied</option> */}
                </select>
            </div>
            </fieldset>
            <br></br>
            <button className='form-submit' id="save-button" onClick={editAdoptionRequest}>Save Updates</button>
        </div>
    );
}

export default EditAdoptionRequestPage;