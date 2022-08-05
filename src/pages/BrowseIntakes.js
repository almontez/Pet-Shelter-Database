import React from "react";
import { Link } from 'react-router-dom';
import IntakeTable from '../components/IntakeTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import intakeData from '../data/intakeData'; // SAMPLE DATA
import { reformatDate } from "./utils/helpers";

function BrowseIntakesPage() {
    
    // DESCRIBE ME!
    const [intakes, setIntakes] = useState([]);
    const history = useHistory();

    // Remove Intake instance from Intakes table
    const onDelete = async(_id) => {
        // Get intake_id from delete route in server.js
        const response = await fetch('/intakes', {
            method: 'DELETE',
            body: JSON.stringify({intake_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // For the record: Request Successfully Fulfilled
            console.log(`Status Code: ${response.status}. Deleting Intake with id = ${_id}`);

            // Generate new pets list for table
            const newIntakesList = intakes.filter(m => m.intake_id !== _id);
            setIntakes(newIntakesList);
        } else {
            // For the record: Log error
            console.error(`Status Code: ${response.status}. Failed to delete Intake with id = ${_id}`);
        } 
    };

    const loadIntakes = async() => {
        // fetch Intakes data [from DB] using READ route in server.js 
        const response = await fetch('/intakes');
        const data = await response.json();
        
        reformatDate(data, 'intake_date')
        
        // load data into intakes variable
        setIntakes(data);
    };

    useEffect(() => {
        // load all intakes data into UI table
        loadIntakes();
    }, []);

    return (
        <>
            <h2>List of Recorded Intakes</h2>
            <IntakeTable
                intakes={intakes}
                onDelete={onDelete}>
            </IntakeTable>

            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowseIntakesPage;