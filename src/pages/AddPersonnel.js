import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";

export const AddPersonnelPage = () => {
    // data containers for dropdown menus 
    const [personnelCodesDropDownList, setPersonnelCodesDropDownList] = useState([]);

    // data containers for personnel information
    const [personnel_type_id, setPersonnelType] = useState('');    // FK: requires a dropdown menu
    const [job_title, setJobTitle] = useState('');                 // Can be null
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirthDate] = useState('');

    const history = useHistory();

    const addPersonnel = async (event) => {
        event.preventDefault();

        const newPersonnel = { personnel_type_id, 
                               job_title, 
                               first_name, 
                               last_name, 
                               address, 
                               phone_number, 
                               email, 
                               birth_date };

        // Make POST request to server 
        const response = await fetch('/personnel', {
            method: 'POST',
            body: JSON.stringify(newPersonnel),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert("Successfully added new personnel")
        } else {
            alert(`Status Code: ${response.status}. Failed to add new personnel`)
        }

        history.push("/browse-personnel");
    };

    const loadPersonnelCodesDropDownList = async () => {
        // Fetch personnel data from personnel-dropdown-list route
        let response = await fetch('/personnel-codes-dropdown-list');
        let data = await response.json()
    
        // load personnel data into dropdown container 
        setPersonnelCodesDropDownList(data);
    };

    const loadDropDownLists = useCallback(async () => {
        await loadPersonnelCodesDropDownList();
    }, []);

    useEffect(() => {
        loadDropDownLists();
    }, []);

    return (
        <form className="add-row" onSubmit={addPersonnel}>
            <h1>Add New Personnel</h1>
            <fieldset className="add-row">
                <legend>Enter values for new personnel</legend>
                <div className="add-row">
                    <label htmlFor="personnel_type_input">Personnel Type: </label>
                    <select id="personnel_type_input" type="number" value={personnel_type_id} onChange={e => setPersonnelType(e.target.value)} required>
                        <option value="0">Select Personnel Type</option>
                        {
                            personnelCodesDropDownList.map((data, i) =>
                            <option key={data.pc_id} 
                                    value={data.pc_id}>
                                    {data.description}</option>)
                        }          
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="job_title_input">Job Title: </label>
                    <input
                        id="job_title_input"
                        type="text"
                        placeholder="Enter job title here"
                        value={job_title}
                        onChange={e => setJobTitle(e.target.value)} />
                </div>
                <div className="add-row">
                    <label htmlFor="first_name_input">First Name: </label>
                    <input
                        id="first_name_input"
                        type="text"
                        placeholder="Enter first name of adopter here"
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="last_name_input">Last Name: </label>
                    <input
                        id="last_name_input"
                        type="text"
                        placeholder="Enter last name of adopter here"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="address_input">Address: </label>
                    <input
                        id="address_input"
                        type="text"
                        placeholder="Enter address of adopter here"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="phone_number_input">Phone Number: </label>
                    <input
                        id="phone_number_input"
                        type="tel"
                        placeholder="Enter personnel phone number here"
                        value={phone_number}
                        onChange={e => setPhoneNumber(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="email_input">Email: </label>
                    <input
                        id="email_input"
                        type="email"
                        placeholder="Enter personnel email here"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="birth_date_input">Birth Date: </label>
                    <input
                        id="birth_date_input"
                        type="date"
                        placeholder="Enter personnel birth date here"
                        value={birth_date}
                        onChange={e => setBirthDate(e.target.value)}
                        required />
                </div>
                </fieldset>
                <input type="submit" value="Add Personnel" />
        </form>
    );
}

export default AddPersonnelPage;