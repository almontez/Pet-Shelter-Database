import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddAdopterPage = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirthDate] = useState('');


//Used for setting default value for dropdown menu
    // useEffect(() => {
    //     setUnit("kgs");
    // }, []);

    const history = useHistory();

    const addAdopter = async (event) => {
        event.preventDefault();
        const newAdopter = { first_name, last_name, address, phone_number, email, birth_date };

        //DEBUG MESSAGE
        console.log(`Added a new adopter: ${JSON.stringify(newAdopter)}`)
        alert(`Added a new adopter: ${JSON.stringify(newAdopter)}`);

        // Makes a POST request to the server. SERVER CODE NOT IMPLEMENTED YET
        
        const response = await fetch('/adopter', {
            method: 'POST',
            body: JSON.stringify(newAdopter), //newAdopter
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the adopter!");
        } else {
            alert(`Failed to add adopter, status code = ${response.status}`);
        }
        
        history.push("/browse-adopters");
    };

    return (
        <form className="add-row" onSubmit={addAdopter}>
            <h1>Add New Adopter</h1>
            <fieldset className="add-row">
                <legend>Enter values for new adopter</legend>
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
                        type="text"
                        placeholder="Enter phone number of adopter here"
                        value={phone_number}
                        onChange={e => setPhoneNumber(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="email_input">Email: </label>
                    <input
                        id="email_input"
                        type="text"
                        placeholder="Enter email of adopter here"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="birth_date_input">Birth Date: </label>
                    <input
                        id="birth_date_input"
                        type="text"
                        placeholder="Enter birth date of adopter here"
                        value={birth_date}
                        onChange={e => setBirthDate(e.target.value)}
                        required />
                </div>
                <input type="submit" value="Add Adopter" />
            </fieldset>
        </form>
    );
}

export default AddAdopterPage;