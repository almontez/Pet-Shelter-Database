import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.reps);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name: name, reps: reps, weight: weight, unit: unit, date: date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
             alert("Successfully edited the exercise!");
        } else {
             alert(`Failed to edit exercise, status code = ${response.status}`);
        }     
        history.push("/");
    };

    return (
        <div className="edit-page">
            <h1>Edit Exercise</h1>
            <div className="edit-exercise">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div className="edit-exercise">
                <label htmlFor="reps">Reps</label>
                <input
                    id="reps"
                    type="number"
                    value={reps}
                    onChange={e => setReps(parseInt(e.target.value))} />
            </div>
            <div className="edit-exercise">
                <label htmlFor="weight">Weight</label>
                <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={e => setWeight(parseInt(e.target.value))} />
            </div>
            <div className="edit-exercise">
                <label id="edit-unit-label" htmlFor="unit">Unit</label>
                <select id="edit-unit-select" value={unit} onChange={e => setUnit(e.target.value)} required>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>
            </div>
            <div className="edit-exercise">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </div>
            <button id="save-button" onClick={editExercise}>Save</button>
        </div>
    );
}

export default EditExercisePage;