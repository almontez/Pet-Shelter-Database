import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddPersonnelCodesPage = () => {

    const [code, setCode] = useState('');
    const [personnel_type, setPersonnelType] = useState('');

    const history = useHistory();

    const addPersonnelType = async (event) => {
        event.preventDefault();
        const newPersonnelType = { code, personnel_type };

        const response = await fetch('/personnel-codes', {
            method: 'POST',
            body: JSON.stringify(newPersonnelType), 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 201) {
            alert("Successfully added new Personnel Code!");
        } else {
            alert(`Status Code: ${response.status}. Failed to add new Personnel`);
        }
        
        history.push("/browse-personnel-codes");
    };

    return (
        <form className="add-row" onSubmit={addPersonnelType}>
            <h1>Add New Personnel</h1>
            <fieldset className="add-row">
                <legend>Enter values for new personnel</legend>
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
                    <label htmlFor="type_input">Personnel Type: </label>
                    <input
                        id="status_input"
                        type="text"
                        placeholder="Enter personnel type here"
                        value={personnel_type}
                        onChange={e => setPersonnelType(e.target.value)}
                        required />
                </div>
                <input type="submit" value="Add Personnel" />
            </fieldset>
        </form>
    );
}

export default AddPersonnelCodesPage;