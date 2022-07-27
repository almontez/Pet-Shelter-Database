import React from 'react';
import { Link } from 'react-router-dom';
import AdopterList from '../components/AdopterList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { reformatDate } from './utils/helpers.js'
//import adopters_sample_data from '../data/adopters'; // SAMPLE DATA

function BrowseAdoptersPage({ setAdopterToEdit }) {
    
    const [adopters, setAdopters] = useState([]);
    const history = useHistory();

    //Re-renders by updating Adopters to a new 
    // filtered list of Adopters that excludes the deleted Adopter
    const onDelete = async (_id) => {

        //DEBUG MESSAGE
        //console.log(`Clicked Delete for adopter_id: ${_id}`)
        //alert(`Clicked Delete for adopter_id: ${_id}`);

        // TO BE IMPLEMENTED: Makes DELETE method request to server on adopter_id
        //const response = await fetch(`/adopter/${_id}`, { method: 'DELETE' });
        const response = await fetch('/adopter', {
            method: 'DELETE',
            body: JSON.stringify({adopter_id: _id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.status);
        if (response.status === 204) {
            console.log(`adopters list before deleting ${_id}:\n${JSON.stringify(adopters)}`);
            const newAdopters = adopters.filter(m => m.adopter_id !== _id);
            setAdopters(newAdopters);
            //console.log(`adopters list after deleting ${_id}:\n${JSON.stringify(adopters)}`);
        } else {
            console.error(`Failed to delete Adopter with adopter_id = ${_id}, status code = ${response.status}`)
        }
        
    }

// Used for UPDATE
/*
    const onEdit = async adopterToEdit => {
        setAdopterToEdit(adopterToEdit);
        history.push("/edit-adopter");
    }


<AdopterList 
    Adopters={Adopters} 
    onDelete={onDelete}
    onEdit={onEdit}>
</AdopterList> 
*/

    const loadAdopters = async () => {
        //fetch data from the server. For now it fetches from our sample data
        const response = await fetch('/adopters');
        const data = await response.json();

        reformatDate(data, 'birth_date');

        //const dateFromDb = data[0]['birth_date'];
        //const dateForUi = new Date(dateFromDb).toLocaleString("en", options);
        //console.log(`Converted Date: ${dateForUi}`);

        //const data = adopters_sample_data; // Fetches sample data. Remove this later after implemented server code.
        
        //console.log(`data: ${data}`);
        setAdopters(data);

        //DEBUG MESSAGE
        //const dataJSONstring = JSON.stringify(data);
        //console.log(`dataJSONstring: ${dataJSONstring}`);
    };


    useEffect(() => {
        loadAdopters();
    }, []);

    //console.log("Hello World from BrowseAdopters");
    //console.log(`adopters data in BrowseAdopters: ${JSON.stringify(adopters)}`);

    return (
        <>
            <h2>List of Recorded Adopters</h2>
            <Link className="navigation-link" to="/add-adopter">Add New Adopter</Link>
            <AdopterList 
                adopters={adopters} 
                onDelete={onDelete}>
            </AdopterList>
            <Link className="App-link" to="/">
              Return to Home Page
            </Link>
        </>
    );
}




export default BrowseAdoptersPage;