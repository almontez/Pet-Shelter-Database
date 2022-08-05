import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddPetStatusesPage = () => {

    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');

    const history = useHistory();

    const addPetStatus = async (event) => {
        event.preventDefault();
        const newPetStatus = { code, status };

        const response = await fetch('/pet-statuses', {
            method: 'POST',
            body: JSON.stringify(newPetStatus),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 201) {
            alert("Successfullly added new Pet Status!");
        } else {
            alert(`Status Code: ${response.status}. Failed to add new Pet Status.`);
        }

        history.push("/browse-pet-statuses");
    };

    return (
        <form className="add-row" onSubmit={addPetStatus}>
            <h1>Add New Pet Status</h1>
            <fieldset className="add-row">
                <legend>Enter values for new pet status</legend>
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
            <input className='form-submit' type="submit" value="Add Pet Status" />
        </form>
    );
}

export default AddPetStatusesPage;