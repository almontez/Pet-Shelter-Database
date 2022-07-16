import React from 'react';
import { Link } from 'react-router-dom';
import AdopterList from '../components/AdopterList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import adopters from '../data/adopters'; // SAMPLE DATA

function BrowseAdoptersPage({ setAdopterToEdit }) {
    
    const [Adopters, setAdopters] = useState([]);
    const history = useHistory();

    //Re-renders by updating Adopters to a new 
    // filtered list of Adopters that excludes the deleted Adopter
    const onDelete = async (_id) => {
        console.log(`Clicked: ${_id}`)
        /*// TO BE IMPLEMENTED: Makes DELETE method to server
        const response = await fetch(`/browse-adopters/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdopters = Adopters.filter(m => m._id !== _id);
            setAdopters(newAdopters);
        } else {
            console.error(`Failed to delete Adopter with id = ${_id}, status code = ${response.status}`)
        }
        */
    }

// Used for UPDATE
/*
    const onEdit = async AdopterToEdit => {
        setAdopterToEdit(AdopterToEdit);
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
        //const response = await fetch('/browse-adopters');
        //const data = await response.json();

        const data = adopters;
        console.log(`data: ${data}`);
        setAdopters(data);
    };


    useEffect(() => {
        loadAdopters();
    }, []);

    console.log("Hello World from BrowseAdopters");
    console.log(`adopters data in BrowseAdopters: ${JSON.stringify(adopters)}`);

    return (
        <>
            <h2>List of Recorded Adopters</h2>
            
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