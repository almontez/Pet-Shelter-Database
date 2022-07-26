import React from "react";
import { Link } from 'react-router-dom';
import IntakeTable from '../components/IntakeTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import intakeData from '../data/intakeData'; // SAMPLE DATA

function BrowseIntakesPage() {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data.

    const [intakes, setIntakes] = useState([]);
    const history = useHistory();

    const onDelete = async(_id) => {
        alert(`Clicked Delete for Intake_id: ${_id}`);
    };

    const loadIntakes = async() => {
       // fetches data using server route to Pets table in DB 
       const response = await fetch('/intakes');
       const data = await response.json();
       
        setIntakes(data);
    };

    useEffect(() => {
        loadIntakes();
    }, []);

    return (
        <>
            <h2>List of Recorded Intakes</h2>

            <Link to="/add-pets">Add New Intake</Link>

            <IntakeTable
                intakes={intakes}
                onDelete={onDelete}>
            </IntakeTable>

            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowseIntakesPage;