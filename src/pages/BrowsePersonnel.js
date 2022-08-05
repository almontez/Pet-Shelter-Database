import React from "react";
import { Link } from 'react-router-dom';
import PersonnelTable from '../components/PersonnelTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import personnelData from '../data/personnelData'; // SAMPLE DATA
import { reformatDate } from "./utils/helpers";

function BrowsePersonnelPage() {
    
    // DESCRIBE ME!
    const [personnel, setPersonnel] = useState([]);
    const history = useHistory();

    // Remove Personnel instance from Personnel Table
    const onDelete = async(_id) => {
        // Get personnel_id from delete route in server.js
        const response = await fetch('/personnel', {
            method: 'DELETE',
            body: JSON.stringify({personnel_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // For the record: Request Successfully Fulfilled
            console.log(`Status Code: ${response.status}. Deleting Personnel with id = ${_id}`);

            // Generate new pets list for table
            const newPersonnelList = personnel.filter(m => m.personnel_id !== _id);
            setPersonnel(newPersonnelList);
        } else {
            // For the record: Log error
            console.error(`Status Code: ${response.status}. Failed to delete Personnel with id = ${_id}`);
        }
    };

    const loadPersonnel = async() => {
        // fetch Personnel data [from DB] using READ route in server.js
        const response = await fetch('/personnel');
        const data = await response.json();

        reformatDate(data, 'birth_date');
        // load data into personnel variable
        setPersonnel(data);
    };

    useEffect(() => {
        // load all personnel data into UI table
        loadPersonnel();
    }, []);

    return (
        <>
            <h2>List of Recorded Personnel</h2>

            <PersonnelTable 
                personnel={personnel}
                onDelete={onDelete}>
            </PersonnelTable>

            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );

}

export default BrowsePersonnelPage;