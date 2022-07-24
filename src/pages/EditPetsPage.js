import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditPetsPage = ({ petToEdit }) => {

    const [species, setSpecies] = useState(petToEdit.species);
    const [name, setPetName] = useState(petToEdit.name);
    const [breed, setPetBreed] = useState(petToEdit.breed);
    const [age, setAge] = useState(petToEdit.age);
    const [gender, setGender] = useState(petToEdit.gender);
    const [weight, setWeight] = useState(petToEdit.weight);
    const [coat_color, setCoatColor] = useState(petToEdit.coat_color);
    const [adoption_status, setAdoptionStatus] = useState(petToEdit.adoption_status) //FK - Need to add drop down menu
    const [adoption_fee_type, setAdoptionFeeType] = useState(petToEdit.adoption_fee_type) //FK - Need to add drop down menu

    const history = useHistory();

    const editPet = async () => {
        const editedPet = { species: species, name: name, breed: breed, age: age, gender: gender, adoption_status: adoption_status, adoption_fee_type: adoption_fee_type };
        
        //DEBUG MESSAGE
        alert(`Edited a an adoption_request: ${JSON.stringify(editedPet)}`);

        history.push("/browse-pets");
    };

    return (
        <form className="add-row" onSubmit={editPet}>
        <h1>Update Pet Information</h1>
        <fieldset className="add-row">
            <legend>Enter updates for new pet</legend>
            <div className="edit-row">
                    <label htmlFor="pet_species_input">Species: </label>
                    <select id="pet_input" type="text" value={species} onChange={e => setSpecies(e.target.value)} required>
                    <option value="None">Select Pet Species</option>
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
                    onChange={e => setAge(parseInt(e.target.value))}
                    required />
            </div>
            <div className="edit-row">
                <label htmlFor="pet_gender_input">Gender: </label>
                    <select id="pet_gender_input" type="text" value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="None">Select Pet Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
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
                    <label htmlFor="adoption_status_input">Adoption Status: </label>
                    <select id="adoption_status_input" type="number" value={adoption_status} onChange={e => setAdoptionStatus(e.target.value)} required>
                        <option value="0">Select Adoption Status</option>
                        <option value="1">On Hold</option>
                        <option value="2">Approved for Adoption</option>
                        <option value="3">Adopted</option>
                    </select>
            </div>
            <div className="edit-row">
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
        <input type="submit" value="Save" />
    </form>
    );
}

export default EditPetsPage;