import React from 'react';
import { Link } from 'react-router-dom';
import PersonnelCodesTable from '../components/PersonnelCodesTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import personnelCodeData from '../data/personnelTypeCodesData'; // SAMPLE DATA

function BrowsePersonnelCodesPage () {
    
    // DESCRIBE ME!
    const [personnel_codes, setPersonnelCodes] = useState([]);
    const history = useHistory();

    // Remove Personnel Code instance from PersonnelTypeCodes Table
    const onDelete = async(_id) => {
        // Get personnel_type_id from delete route in server.js
        const response = await fetch('/personnel-codes', {
            method: 'DELETE',
            body: JSON.stringify({personnel_type_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // For the record: Request Successfully Fulfilled
            console.log(`Status Code: ${response.status}. Deleting Personnel Code with id = ${_id}`);

            // Generate new pets list for table
            const newPersonnelCodesList = personnel_codes.filter(m => m.personnel_type_id !== _id);
            setPersonnelCodes(newPersonnelCodesList);
        } else {
            // For the record: Log error
            console.error(`Status Code: ${response.status}. Failed to delete Personnel Code with id = ${_id}`);
        }
    }; 

    const loadCodes = async() => {
         // fetch PersonnelTypeCodes data [from DB] using READ route in server.js  
        const response = await fetch('/personnel-codes');
        const data = await response.json();
        
        // load data into personnel_codes variable 
        setPersonnelCodes(data)
    };

    useEffect(() => {
        // load data into Personnel Codes UI table
        loadCodes();
    }, []);

    return (
        <>
            <h2>List of Recorded Personnel Codes</h2>

            <Link to="/add-personnel-codes">Add New Personnel Code</Link>

            <PersonnelCodesTable
                personnel_codes={personnel_codes}
                onDelete={onDelete}>
            </PersonnelCodesTable>

            <Link to="/category-tables">Return Category Tables</Link>
            <br></br>
            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePersonnelCodesPage;