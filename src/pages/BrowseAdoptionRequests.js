import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionRequestList from '../components/AdoptionRequestList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import adoption_requests_sample_data from '../data/adoption_requests'; // SAMPLE DATA

function BrowseAdoptionRequestsPage({ setAdoptionRequestStatusCodeToEdit }) {
    
    const [adoption_requests, setAdoptionRequests] = useState([]);
    const history = useHistory();

    //Re-renders by updating AdoptionRequests to a new 
    // filtered list of AdoptionRequests that excludes the deleted AdoptionRequestStatusCode
    const onDelete = async (adopter_pet_id) => {

        //DEBUG MESSAGE
        const debugMessage = `Clicked Delete for adopter_pet_id: ${adopter_pet_id}`;
        console.log(debugMessage);
        alert(debugMessage);

        /*// TO BE IMPLEMENTED: Makes DELETE method to server
        const response = await fetch(`/adoption-requests/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdoptionRequests = adoption_requests.filter(m => m._id !== _id);
            setAdoptionRequests(newAdoptionRequests);
        } else {
            console.error(`Failed to delete AdoptionRequestStatusCode with id = ${_id}, status code = ${response.status}`)
        }
        */
    }

    // Used for UPDATE
    const onEdit = async adoptionRequestStatusCodeToEdit => {
        setAdoptionRequestStatusCodeToEdit(adoptionRequestStatusCodeToEdit);
        history.push("/edit-adoption-request-status-code");
    }

/*
<AdoptionRequestList 
    AdoptionRequests={AdoptionRequests} 
    onDelete={onDelete}
    onEdit={onEdit}>
</AdoptionRequestList> 
*/

    const loadAdoptionRequests = async () => {
        //fetch data from the server. For now it fetches from our sample data
        //const response = await fetch('/adoption-requests');
        //const data = await response.json();

        const data = adoption_requests_sample_data; // Fetches sample data. Remove this later after implemented server code.
        console.log(`data: ${data}`);
        setAdoptionRequests(data);
    };


    useEffect(() => {
        loadAdoptionRequests();
    }, []);

    console.log("Hello World from BrowseAdoptionRequests");
    console.log(`adoption_requests data in BrowseAdoptionRequests: ${JSON.stringify(adoption_requests)}`);

    return (
        <>
            <h2>List of Recorded AdoptionRequests</h2>
            <Link className="navigation-link" to="/add-adoption-request">Add New AdoptionRequest</Link>
            <AdoptionRequestList
                adoption_requests={adoption_requests} 
                onDelete={onDelete}
                onEdit={onEdit}>
            </AdoptionRequestList>
            <Link className="App-link" to="/">
              Return to Home Page
            </Link>
        </>
    );
}




export default BrowseAdoptionRequestsPage;