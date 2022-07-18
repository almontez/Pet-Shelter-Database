import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddPetStatusesPage = () => {

    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');

    const history = useHistory();

    const addPetStatus = async (event) => {
        event.preventDefault();
        const newPetStatus = { code, status };

        //DEBUG MESSAGE
        alert(`Added a new pet_status: ${JSON.stringify(newPetStatus)}`);

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
                        type="number"
                        placeholder="Enter fee here"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required />
                </div>
                <input type="submit" value="Add Pet Status" />
            </fieldset>
        </form>
    );
}

export default AddPetStatusesPage;