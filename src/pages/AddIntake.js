import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";

export const AddIntakesPage = () => {
    // data for dropdown menus
    const [petStatusDropDownList, setPetStatusDropDownList] = useState([]);
    const [adoptionFeeTypeDropDownList, setAdoptionFeeTypeDropDownList] = useState([]);
    const [personnelDropDownList, setPersonnelDropDownList] = useState([]);

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
    const [intake_date, setIntakeDate] = useState(''); 
    const [processor, setProcessor] = useState(''); //FK - Need to add drop down menu
    const [drop_off_type, setDropOffType] = useState('');
    const [intake_details, setIntakeDetails] = useState('');

    const history = useHistory();

    const addPetIntake = async (event) => {
        event.preventDefault();

        const newPetIntake = { species, 
                               name, 
                               breed, 
                               age, 
                               gender, 
                               weight, 
                               coat_color, 
                               adoption_status, 
                               adoption_fee_type,
                               intake_date, 
                               processor, 
                               drop_off_type, 
                               intake_details };
        
        // Make POST request to server 
        const response = await fetch('/pet-intake', {
            method: 'POST',
            body: JSON.stringify(newPetIntake),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.status === 201) {
            alert("Successfully added new pet and intake data")
        } else {
            alert(`Status Code: ${response.status}. Failed to add new pet and intake data`)
        }

        history.push("/browse-intakes");
    };

    const loadPetStatusesDropDownList = async () => {
        // Fetch Pet Status data from server
        let response = await fetch('/pet-statuses-dropdown-list');
        let data = await response.json();

        // load pet statuses into dropdown container
        setPetStatusDropDownList(data);
    };

    const loadAdoptionFeeTypeDropDownList = async () => {
        // Fetch Adoption Fee Type data from server
        let response = await fetch('/adoption-fee-type-dropdown-list');
        let data = await response.json();

        // load adoption fee type data into dropdown container
        setAdoptionFeeTypeDropDownList(data);
    };

    const loadPersonnelDropDownList = async () => {
        // Fetch Personnel data from server
        let response = await fetch('/personnel-dropdown-list');
        let data = await response.json();

        // load adoption fee type data into dropdown container
        setPersonnelDropDownList(data);
    };

    // Citation for following code block
    // Date: 7/23/2022
    // Adapted from:
    // Source URL: https://stackoverflow.com/a/53572588/5715461
    const loadDropDownLists = useCallback(async () => {
        await loadPetStatusesDropDownList();
        await loadAdoptionFeeTypeDropDownList();
        await loadPersonnelDropDownList();
    }, []);

    useEffect(() => {
        loadDropDownLists();
    }, []);

    return (
        <form className="add-row" onSubmit={addPetIntake}>
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
                        min="0.01"
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="pet_gender_input">Gender: </label>
                    <select id="pet_gender_input" type="text" value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="None">Select Pet Gender</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
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
                        min="0.01"
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
                    <label htmlFor="pet_status_input">Adoption Status: </label>
                    <select id="pet_status_input" type="number" value={adoption_status} onChange={e => setAdoptionStatus(e.target.value)} required>
                        <option value="0">Select Pet Status</option>
                        {
                            petStatusDropDownList.map( (data, i) => 
                            <option key={data.ps_id} 
                                    value={data.ps_id}>
                                    {data.status}</option> )
                        }
                    </select>
                </div>
                <div className="add-row">
                    <label htmlFor="adoption_fee_type_input">Adoption Fee Type: </label>
                    <select id="adoption_fee_type_input" type="number" value={adoption_fee_type} onChange={e => setAdoptionFeeType(e.target.value)} required>
                        <option value="0">Select Adoption Fee Type</option>
                        {
                            adoptionFeeTypeDropDownList.map( (data, i) => 
                            <option key={data.afc_id} 
                                    value={data.afc_id}>
                                    {data.code}: ${data.fee}</option> )
                        }
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
                        {
                            personnelDropDownList.map( (data, i) => 
                            <option key={data.personnel_id} 
                                    value={data.personnel_id}>
                                    {data.personnel_name}</option> )
                        }
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
                        onChange={e => setIntakeDetails(e.target.value)} />
                </div>
            </fieldset>
            <br></br>
            <input className='form-submit' type="submit" value="Add Pet &amp; Intake Data" />
        </form>
    );
}

export default AddIntakesPage;