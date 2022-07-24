import React from 'react';
import { Link } from 'react-router-dom';
import AdopterList from '../components/AdopterList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import adopters_sample_data from '../data/adopters'; // SAMPLE DATA

function BrowseAdoptersPage({ setAdopterToEdit }) {
    
    const [adopters, setAdopters] = useState([]);
    const history = useHistory();

    //Re-renders by updating Adopters to a new 
    // filtered list of Adopters that excludes the deleted Adopter
    const onDelete = async (_id) => {

        //DEBUG MESSAGE
        console.log(`Clicked Delete for adopter_id: ${_id}`)
        alert(`Clicked Delete for adopter_id: ${_id}`);

        /*// TO BE IMPLEMENTED: Makes DELETE method to server
        const response = await fetch(`/adopters/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdopters = adopters.filter(m => m._id !== _id);
            setAdopters(newAdopters);
        } else {
            console.error(`Failed to delete Adopter with id = ${_id}, status code = ${response.status}`)
        }
        */
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

        // Citation for following code block
        // Date: 7/23/2022
        // Adapted from:
        // Source URL: https://stackoverflow.com/a/17743990/5715461
        // Reformat birth_date to MM/DD/YYYY
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        for (let i = 0; i < data.length; i++) {
            let dateFromDb = data[i]['birth_date'];
            let dateForUi = new Date(dateFromDb).toLocaleString("en", options);
            data[i]['birth_date'] = dateForUi
          }

        //const dateFromDb = data[0]['birth_date'];
        //const dateForUi = new Date(dateFromDb).toLocaleString("en", options);
        //console.log(`Converted Date: ${dateForUi}`);

        //const data = adopters_sample_data; // Fetches sample data. Remove this later after implemented server code.
        
        //console.log(`data: ${data}`);
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