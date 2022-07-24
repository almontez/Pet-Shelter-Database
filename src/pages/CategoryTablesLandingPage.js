import React, { useState, useEffect } from 'react';
import { useHistory, Link} from "react-router-dom";

function CategoryTableLP() {
    // NEED TO WORK ON JS CODE TO ROUTE TO PAGES
    const [code_table, setTable] = useState('');
    const history = useHistory();

    const redirect = async(event) => {
        event.preventDefault();
        const tableSelection = {code_table}

        if (tableSelection.code_table === "Adoption Fee Codes") {
            history.push("/browse-adoption-fee-codes");
        } else if (tableSelection.code_table === "Adoption Request Status Codes") {
            history.push("/browse-adoption-request-status-codes");
        } else if (tableSelection.code_table === "Personnel Codes") {
            history.push("/browse-personnel-codes");
        } else if (tableSelection.code_table === "Pet Statuses") {
            history.push("/browse-pet-statuses")
        }
    };

    return (
        <>
            <h1>View Category Tables</h1>
            <p>Click the "Submit" button to view the selected category.</p>

            <form className="landing-page" onSubmit={redirect}>
                <label htmlfor="category-tables">Choose a category table: </label>
                <select id="category-tables" type="text" value={code_table} onChange={e => setTable(e.target.value)} required>
                    <option value="None">Category Tables</option>
                    <option value="Adoption Fee Codes">Adoption Fee Codes</option>
                    <option value="Adoption Request Status Codes">Adoption Request Status Codes</option>
                    <option value="Personnel Codes">Personnel Codes</option>
                    <option value="Pet Statuses">Pet Statuses</option>
                </select>
                <input type="submit" value="Select"></input>
            </form>

            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default CategoryTableLP;