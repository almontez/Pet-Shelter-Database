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
        console.log(`Added a new adoption_request_status_code: ${JSON.stringify(newAdoptionRequestStatusCode)}`)
        alert(`Added a new adoption_request_status_code: ${JSON.stringify(newAdoptionRequestStatusCode)}`);

        // Makes a POST request to the server. SERVER CODE NOT IMPLEMENTED YET
        /*
        const response = await fetch('/adoption_request_status_codes', {
            method: 'POST',
            body: JSON.stringify(newAdoptionRequestStatusCode),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the adoption_request_status_code!");
        } else {
            alert(`Failed to add adoption_request_status_code, status code = ${response.status}`);
        }
        */
        history.push("/browse-adoption-request-status-codes");
    };

    return (
        <form className="add-row" onSubmit={addAdoptionRequestStatusCode}>
            <h1>Add New AdoptionRequestStatusCode</h1>
            <fieldset className="add-row">
                <legend>Enter values for new adoption_request_status_code:</legend>
                <div className="add-row">
                    <label htmlFor="code_input">Code:</label>
                    <input
                        id="code_input"
                        type="text"
                        placeholder="Enter code here"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="status_input">Status:</label>
                    <input
                        id="status_input"
                        type="text"
                        placeholder="Enter status here"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required />
                </div>
                <input type="submit" value="Add AdoptionRequestStatusCode" />
            </fieldset>
        </form>
    );
}

export default AddAdoptionRequestStatusCodePage;