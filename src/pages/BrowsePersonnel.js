import React from "react";
import { Link } from 'react-router-dom';
import PersonnelTable from '../components/PersonnelTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import personnelData from '../data/personnelData'; // SAMPLE DATA

function BrowsePersonnelPage() {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data
    
    const [personnel, setPersonnel] = useState([]);
    const history = useHistory();

    const onDelete = async(_id) => {
        alert(`Clicked Delete for Personnel_id: ${_id}`);
    };

    const loadPersonnel = async() => {
        // fetches data using server route to Personnel table in DB 
        const response = await fetch('/personnel');
        const data = await response.json();

        setPersonnel(data);
    };

    useEffect(() => {
        loadPersonnel();
    }, []);

    return (
        <>
            <h2>List of Recorded Personnel</h2>

            <Link to="/add-personnel">Add New Personnel</Link>

            <PersonnelTable 
                personnel={personnel}
                onDelete={onDelete}>
            </PersonnelTable>

            <Link to="/">Return to Home Page</Link>
        </>
    );

}

export default BrowsePersonnelPage;