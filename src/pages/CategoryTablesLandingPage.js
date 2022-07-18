import React from 'react';
import { Link } from 'react-router-dom';

function CategoryTableLP() {
    // NEED TO WORK ON JS CODE TO ROUTE TO PAGES

    return (
        <>
            <h1>View Category Tables</h1>
            <p>Click the "Submit" button to view the selected category.</p>

            <form className="landing-page">
                <label for="category-tables">Choose a category table: </label>
                <select name="category-tables" id="category-tables">
                    <option value="Adoption Fee Codes">Adoption Fee Codes</option>
                    <option value="Adoption Request Status Codes">Adoption Request Status Codes</option>
                    <option value="Personnel Codes">Personnel Codes</option>
                    <option value="Pet Statuses">Pet Statuses</option>
                </select>
                <br></br>
                <input type="submit" value="Select"></input>
            </form>
        </>
    );
}

export default CategoryTableLP;