import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionFeeCodeList from '../components/AdoptionFeeCodeList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import adoption_fee_codes_sample_data from '../data/adoption_fee_codes'; // SAMPLE DATA

function BrowseAdoptionFeeCodesPage({ setAdoptionFeeCodeToEdit }) {
    
    const [adoption_fee_codes, setAdoptionFeeCodes] = useState([]);
    const history = useHistory();

    //Re-renders by updating AdoptionFeeCodes to a new 
    // filtered list of AdoptionFeeCodes that excludes the deleted AdoptionFeeCode
    const onDelete = async (_id) => {

        //DEBUG MESSAGE
        console.log(`Clicked Delete for AdoptionFeeCode_id: ${_id}`)
        alert(`Clicked Delete for AdoptionFeeCode_id: ${_id}`);

        /*// TO BE IMPLEMENTED: Makes DELETE method to server
        const response = await fetch(`/adoption-fee-codes/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdoptionFeeCodes = adoption_fee_codes.filter(m => m._id !== _id);
            setAdoptionFeeCodes(newAdoptionFeeCodes);
        } else {
            console.error(`Failed to delete AdoptionFeeCode with id = ${_id}, status code = ${response.status}`)
        }
        */
    }

// Used for UPDATE
/*
    const onEdit = async AdoptionFeeCodeToEdit => {
        setAdoptionFeeCodeToEdit(AdoptionFeeCodeToEdit);
        history.push("/edit-AdoptionFeeCode");
    }


<AdoptionFeeCodeList 
    AdoptionFeeCodes={AdoptionFeeCodes} 
    onDelete={onDelete}
    onEdit={onEdit}>
</AdoptionFeeCodeList> 
*/

    const loadAdoptionFeeCodes = async () => {
        //fetch data from the server. For now it fetches from our sample data
        //const response = await fetch('/adoption-fee-codes');
        //const data = await response.json();

        const data = adoption_fee_codes_sample_data; // Fetches sample data. Remove this later after implemented server code.
        console.log(`data: ${data}`);
        setAdoptionFeeCodes(data);
    };


    useEffect(() => {
        loadAdoptionFeeCodes();
    }, []);

    console.log("Hello World from BrowseAdoptionFeeCodes");
    console.log(`AdoptionFeeCodes data in BrowseAdoptionFeeCodes: ${JSON.stringify(adoption_fee_codes)}`);

    return (
        <>
            <h2>List of Recorded Adoption Fee Codes</h2>
            <Link className="navigation-link" to="/add-adoption-fee-code">Add New Adoption Fee Code</Link>
            <AdoptionFeeCodeList 
                adoption_fee_codes={adoption_fee_codes} 
                onDelete={onDelete}>
            </AdoptionFeeCodeList>
            <Link to="/category-tables">Return Category Tables</Link>
            <br></br>
            <Link className="App-link" to="/">
              Return to Home Page
            </Link>
        </>
    );
}




export default BrowseAdoptionFeeCodesPage;