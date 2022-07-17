import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionRequestStatusCodeList from '../components/AdoptionRequestStatusCodeList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import adoption_request_status_codes from '../data/adoption_request_status_codes'; // SAMPLE DATA

function BrowseAdoptionRequestStatusCodesPage({ setAdoptionRequestStatusCodeToEdit }) {
    
    const [AdoptionRequestStatusCodes, setAdoptionRequestStatusCodes] = useState([]);
    const history = useHistory();

    //Re-renders by updating AdoptionRequestStatusCodes to a new 
    // filtered list of AdoptionRequestStatusCodes that excludes the deleted AdoptionRequestStatusCode
    const onDelete = async (_id) => {

        //DEBUG MESSAGE
        console.log(`Clicked Delete for AdoptionRequestStatusCode_id: ${_id}`)
        alert(`Clicked Delete for AdoptionRequestStatusCode_id: ${_id}`);

        /*// TO BE IMPLEMENTED: Makes DELETE method to server
        const response = await fetch(`/browse-adoption-request-status-codes/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdoptionRequestStatusCodes = AdoptionRequestStatusCodes.filter(m => m._id !== _id);
            setAdoptionRequestStatusCodes(newAdoptionRequestStatusCodes);
        } else {
            console.error(`Failed to delete AdoptionRequestStatusCode with id = ${_id}, status code = ${response.status}`)
        }
        */
    }

// Used for UPDATE
/*
    const onEdit = async AdoptionRequestStatusCodeToEdit => {
        setAdoptionRequestStatusCodeToEdit(AdoptionRequestStatusCodeToEdit);
        history.push("/edit-AdoptionRequestStatusCode");
    }


<AdoptionRequestStatusCodeList 
    AdoptionRequestStatusCodes={AdoptionRequestStatusCodes} 
    onDelete={onDelete}
    onEdit={onEdit}>
</AdoptionRequestStatusCodeList> 
*/

    const loadAdoptionRequestStatusCodes = async () => {
        //fetch data from the server. For now it fetches from our sample data
        //const response = await fetch('/browse-AdoptionRequestStatusCodes');
        //const data = await response.json();

        const data = adoption_request_status_codes; // Fetches sample data. Remove this later after implemented server code.
        console.log(`data: ${data}`);
        setAdoptionRequestStatusCodes(data);
    };


    useEffect(() => {
        loadAdoptionRequestStatusCodes();
    }, []);

    console.log("Hello World from BrowseAdoptionRequestStatusCodes");
    console.log(`AdoptionRequestStatusCodes data in BrowseAdoptionRequestStatusCodes: ${JSON.stringify(adoption_request_status_codes)}`);

    return (
        <>
            <h2>List of Recorded AdoptionRequestStatusCodes</h2>
            <Link className="navigation-link" to="/add-adoption-request-status-code">Add New AdoptionRequestStatusCode</Link>
            <AdoptionRequestStatusCodeList
                adoption_request_status_codes={adoption_request_status_codes} 
                onDelete={onDelete}>
            </AdoptionRequestStatusCodeList>
            <Link className="App-link" to="/">
              Return to Home Page
            </Link>
        </>
    );
}




export default BrowseAdoptionRequestStatusCodesPage;