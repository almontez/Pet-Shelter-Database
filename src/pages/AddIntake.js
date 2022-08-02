import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddIntakesPage = () => {
    // pet information
    const [species, setSpecies] = useState('');
    const [name, setPetName] = useState('');
    const [breed, setPetBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [coat_color, setCoatColor] = useState('');
    const [adoption_status, setAdoptionStatus] = useState('') //FK - Need to add drop down menu
    const [adoption_fee_type, setAdoptionFeeType] = useState('') //FK - Need to add drop down menu

    // intake information
    const [pet_id, setPetId] = useState('');  //FK - Need to add drop down menu
    const [intake_date, setIntakeDate] = useState(''); 
    const [processor, setProcessor] = useState(''); //FK - Need to add drop down menu
    const [drop_off_type, setDropOffType] = useState('');
    const [intake_details, setIntakeDetails] = useState('');

    const history = useHistory();

    const addIntake = async (event) => {
        event.preventDefault();
        const newIntake = { species, name, breed, age, gender, weight, coat_color, adoption_status, adoption_fee_type,
                            pet_id, intake_date, processor, drop_off_type, intake_details };

        alert(`Added a new intake: ${JSON.stringify(newIntake)}`);

        history.push("/browse-intakes");
    };

    return (
        <form className="add-row" onSubmit={addIntake}>
            <h1>Add New Pet</h1>
            <fieldset className="add-row">
                <legend>Enter values for new pet</legend>
                <div className="add-row">
                    <label htmlFor="pet_species_input">Species: </label>
                    <select id="pet_input" type="text" value={species} onChange={e => setSpecies(e.target.value)} required>
                    <option value="None">Select Pet Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="pet_name_input">Pet Name: </label>
                    <input
                        id="pet_name_input"
                        type="text"
                        placeholder="Enter pet name here"
                        value={name}
                        onChange={e => setPetName(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="pet_breed_input">Breed: </label>
                    <input
                        id="pet_breed_input"
                        type="text"
                        placeholder="Enter pet breed here"
                        value={breed}
                        onChange={e => setPetBreed(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="pet_age_input">Age (yrs): </label>
                    <input
                        id="pet_age_input"
                        type="number"
                        step="0.01"
                        placeholder="Enter pet age in years here"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="pet_gender_input">Gender: </label>
                    <select id="pet_gender_input" type="text" value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="None">Select Pet Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="pet_weight_input">Weight (lbs): </label>
                    <input
                        id="pet_weight_input"
                        type="number"
                        step="0.01"
                        placeholder="Enter pet weight in lbs here"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="pet_color_input">Coat Color: </label>
                    <input
                        id="pet_color_input"
                        type="text"
                        placeholder="Enter pet coat color here"
                        value={coat_color}
                        onChange={e => setCoatColor(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="adoption_status_input">Adoption Status: </label>
                    <select id="adoption_status_input" type="number" value={adoption_status} onChange={e => setAdoptionStatus(e.target.value)} required>
                        <option value="0">Select Adoption Status</option>
                        <option value="1">On Hold</option>
                        <option value="2">Approved for Adoption</option>
                        <option value="3">Adopted</option>
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="adoption_fee_type_input">Adoption Fee Type: </label>
                    <select id="adoption_fee_type_input" type="number" value={adoption_fee_type} onChange={e => setAdoptionFeeType(e.target.value)} required>
                        <option value="0">Select Adoption Fee Type</option>
                        <option value="1">Puppy: $250</option>
                        <option value="2">Kitten: $200</option>
                        <option value="3">Adult: $150</option>
                        <option value="4">Senior: $100</option>
                    </select>
                </div>
            </fieldset>

            <h1>Add Intake Information</h1>
            <fieldset className="add-row">
                <legend>Enter values for new intake</legend>
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
            <br></br>
            <input type="submit" value="Add Pet &amp; Intake Data" />
        </form>
    );
}

export default AddIntakesPage;