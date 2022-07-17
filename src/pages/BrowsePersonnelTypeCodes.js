import React from 'react';
import { Link } from 'react-router-dom';
import PersonnelCodesTable from '../components/PersonnelCodesTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import personnelCodeData from '../data/personnelTypeCodesData'; // SAMPLE DATA

function BrowsePersonnelCodesPage () {
    // TODO: Update JS CODE using sql queried data. Currently only loads sample data.

    const [personnel_codes, setPersonnelCodes] = useState([]);
    const history = useHistory();

    const onDelete = async(_id) => {
        alert(`Clicked Delete for Personnel_Code_id: ${_id}`);
    };

    const loadCodes = async() => {
        const data = personnelCodeData
        setPersonnelCodes(data)
    };

    useEffect(() => {
        loadCodes();
    }, []);

    return (
        <>
            <h2>List of Recorded Personnel Codes</h2>

            <Link to="/add-personnel-code">Add New Personnel</Link>

            <PersonnelCodesTable
                personnel_codes={personnel_codes}
                onDelete={onDelete}>
            </PersonnelCodesTable>

            <Link to="/">Return to Home Page</Link>
        </>
    );
}

export default BrowsePersonnelCodesPage;