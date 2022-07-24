import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddIntakesPage = () => {
    // intake information
    const [pet_id, setPetId] = useState('');  //FK - Need to add drop down menu
    const [intake_date, setIntakeDate] = useState(''); 
    const [processor, setProcessor] = useState(''); //FK - Need to add drop down menu
    const [drop_off_type, setDropOffType] = useState('');
    const [intake_details, setIntakeDetails] = useState('');

    const history = useHistory();

    const addIntake = async (event) => {
        event.preventDefault();
        const newIntake = { pet_id, intake_date, processor, drop_off_type, intake_details };

        alert(`Added a new intake: ${JSON.stringify(newIntake)}`);

        history.push("/browse-intakes");
    };

    return (
        <form className="add-row" onSubmit={addIntake}>
            <h1>Add Intake Information</h1>
            <fieldset className="add-row">
                <legend>Enter values for new intake</legend>
                <div className="add-row">
                    <label htmlFor="pet_id_input">Pet ID: </label>
                    <select id="pet_id_input" type="number" value={pet_id} onChange={e => setPetId(e.target.value)} required>
                    <option value="1">Cooper</option>
                    <option value="2">Elsa</option>
                    <option value="3">Stitch</option>
                    <option value="4">Poppy</option>
                    <option value="4">Hugh</option>
                    <option value="5">New Pet</option>
                </select>
                </div>
                <div className="add-row">
                    <label htmlFor="intake_date_input">Intake Date: </label>
                    <input
                        id="intake_date_input"
                        type="date"
                        placeholder="Enter intake date here"
                        value={intake_date}
                        onChange={e => setIntakeDate(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="processor_input">Processor: </label>
                    <select id="processor_input" type="number" value={processor} onChange={e => setProcessor(e.target.value)} required>
                        <option value="0">Select Processor</option>
                        <option value="1">Muriel Rashn, Employee Full-Time</option>
                        <option value="2">Marie Cohnan, Employee Part-Time</option>
                        <option value="3">Vanna Tran, Volunteer - Cats</option>
                        <option value="4">Arthur Brooks, Volunteer- Cats</option>
                        <option value="4">Bobby Lee, Volunteer - Both</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="drop_off_input">Drop Off Type: </label>
                    <select id="drop_off_input" type="text" value={drop_off_type} onChange={e => setDropOffType(e.target.value)} required>
                        <option value="0">Select Drop Off Type</option>
                        <option value="stray">Stray</option>
                        <option value="owner surrender">Owner Surrender</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="intake_details_input">Intake Details: </label>
                    <input
                        id="intake_details_input"
                        type="text"
                        placeholder="Enter intake details here"
                        value={intake_details}
                        onChange={e => setIntakeDetails(e.target.value)}
                        required />
                </div>
            </fieldset>
            <input type="submit" value="Add Intake" />
        </form>
    );
}

export default AddIntakesPage;