import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const EditPetsPage = ({ petToEdit }) => {
    // data for dropdown menus
    const [petStatusDropDownList, setPetStatusDropDownList] = useState([]);
    const [adoptionFeeTypeDropDownList, setAdoptionFeeTypeDropDownList] = useState([]);

    // pet information container 
    const [species, setSpecies] = useState(petToEdit.species);
    const [name, setPetName] = useState(petToEdit.name);
    const [breed, setPetBreed] = useState(petToEdit.breed);
    const [age, setAge] = useState(petToEdit.age);
    const [gender, setGender] = useState(petToEdit.gender);
    const [weight, setWeight] = useState(petToEdit.weight);
    const [coat_color, setCoatColor] = useState(petToEdit.coat_color);
    const [adoption_status, setAdoptionStatus] = useState(petToEdit.pet_status_id) //FK - Need to add drop down menu
    const [adoption_fee_type, setAdoptionFeeType] = useState(petToEdit.adoption_fee_id) //FK - Need to add drop down menu

    const history = useHistory();

    const editPet = async () => {

        const editedPet = { pet_id: petToEdit.pet_id, 
                            species: species, 
                            name: name, 
                            breed: breed, 
                            age: age, 
                            gender: gender, 
                            weight: weight, 
                            adoption_status: adoption_status, 
                            adoption_fee_type: adoption_fee_type };
        
        const response = await fetch('/pets', {
            method: 'PUT',
            body: JSON.stringify(editedPet),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.status === 200){
            alert("Successfully edited selected pet!");
        } else {
            alert(`Status Code: ${response.status}. Failed to edit selected pet.`);
        }  

        history.push("/browse-pets");
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

    // Citation for following code block
    // Date: 7/23/2022
    // Adapted from:
    // Source URL: https://stackoverflow.com/a/53572588/5715461
    const loadDropDownLists = useCallback(async () => {
        await loadPetStatusesDropDownList();
        await loadAdoptionFeeTypeDropDownList();
    }, []);

    useEffect(() => {
        loadDropDownLists();
    }, []);

    return (
        <div className="edit-page">
        <h1>Update Pet Information</h1>
        <fieldset>
            <legend>Enter updates for selected pet</legend>
            <div className="edit-row">
                <label htmlFor="pet_species_input">Species: </label>
                <select id="pet_input" type="text" value={species} onChange={e => setSpecies(e.target.value)} required>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
            </div>
            <div className="pet-row">
                <label htmlFor="pet_name_input">Pet Name: </label>
                <input
                    id="pet_name_input"
                    type="text"
                    placeholder="Enter pet name here"
                    value={name}
                    onChange={e => setPetName(e.target.value)}
                    required />
            </div>
            <div className="edit-row">
                <label htmlFor="pet_breed_input">Breed: </label>
                <input
                    id="pet_breed_input"
                    type="text"
                    placeholder="Enter pet breed here"
                    value={breed}
                    onChange={e => setPetBreed(e.target.value)}
                    required />
            </div>
            <div className="edit-row">
                <label htmlFor="pet_age_input">Age (yrs): </label>
                <input
                    id="pet_age_input"
                    type="number"
                    step="0.01"
                    placeholder="Enter pet age in years here"
                    value={age}
                    onChange={e => setAge(parseFloat(e.target.value))}
                    min="0.01"
                    required />
            </div>
            <div className="edit-row">
                <label htmlFor="pet_gender_input">Gender: </label>
                    <select id="pet_gender_input" type="text" value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                    </select>
            </div>
            <div className="edit-row">
                <label htmlFor="pet_weight_input">Weight (lbs): </label>
                <input
                    id="pet_weight_input"
                    type="number"
                    step="0.01"
                    placeholder="Enter pet weight in lbs here"
                    value={weight}
                    onChange={e => setWeight(parseInt(e.target.value))}
                    min="0.01"
                    required />
            </div>
            <div className="edit-row">
                <label htmlFor="pet_color_input">Coat Color: </label>
                <input
                    id="pet_color_input"
                    type="text"
                    placeholder="Enter pet coat color here"
                    value={coat_color}
                    onChange={e => setCoatColor(e.target.value)}
                    required />
            </div>
            <div className="edit-row">
                    <label htmlFor="pet_status_input">Adoption Status: </label>
                    <select id="pet_status_input" type="number" value={adoption_status} onChange={e => setAdoptionStatus(parseFloat(e.target.value))} required>
                        {
                            petStatusDropDownList.map( (data, i) => 
                            <option key={data.ps_id} 
                                    value={data.ps_id}>
                                    {data.status}</option> )
                        }
                    </select>
            </div>
            <div className="edit-row">
                    <label htmlFor="adoption_fee_type_input">Adoption Fee Type: </label>
                    <select id="adoption_fee_type_input" type="number" value={adoption_fee_type} onChange={e => setAdoptionFeeType(parseInt(e.target.value))} required>
                        {
                            adoptionFeeTypeDropDownList.map( (data, i) => 
                            <option key={data.afc_id} 
                                    value={data.afc_id}>
                                    {data.code}: ${data.fee}</option> )
                        }
                    </select>
            </div>
        </fieldset>
        <br></br>
        <button className='form-submit' id='save-button' onClick={editPet}>Save Updates</button>
    </div>
    );
}

export default EditPetsPage;