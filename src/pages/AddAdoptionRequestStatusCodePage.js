import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddAdoptionRequestStatusCodePage = () => {

    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');

//Used for setting default value for dropdown menu
    // useEffect(() => {
    //     setUnit("kgs");
    // }, []);

    const history = useHistory();

    const addAdoptionRequestStatusCode = async (event) => {
        event.preventDefault();
        const newAdoptionRequestStatusCode = { code, status };

        //DEBUG MESSAGE
        //console.log(`Added a new adoption_request_status_code: ${JSON.stringify(newAdoptionRequestStatusCode)}`)
        //alert(`Added a new Adoption Request Status Code: ${JSON.stringify(newAdoptionRequestStatusCode)}`);

        // Makes a POST request to the server. SERVER CODE NOT IMPLEMENTED YET
        const response = await fetch('/adoption-request-status-code', {
            method: 'POST',
            body: JSON.stringify(newAdoptionRequestStatusCode),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the Adoption Request Status Code!");
        } else {
            alert(`Failed to add Adoption Request Status Code. Response status code = ${response.status}`);
        }
        
        history.push("/browse-adoption-request-status-codes");
    };

    return (
        <form className="add-row" onSubmit={addAdoptionRequestStatusCode}>
            <h1>Add New Adoption Request Status Code</h1>
            <fieldset className="add-row">
                <legend>Enter values for new adoption request status code</legend>
                <div className="add-row">
                    <label htmlFor="code_input">Code: </label>
                    <input
                        id="code_input"
                        type="text"
                        placeholder="Enter code here"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="status_input">Status: </label>
                    <input
                        id="status_input"
                        type="text"
                        placeholder="Enter status here"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required />
                </div>
            </fieldset>
            <br></br>
            <input className='form-submit' type="submit" value="Add Adoption Request Status Code" />
        </form>
    );
}

export default AddAdoptionRequestStatusCodePage;