import React from 'react';
import { Link } from 'react-router-dom';
//import AdopterList from '../components/AdopterList'; ----> Ben will create this component
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function BrowseAdoptersPage({ setAdopterToEdit }) {
    
    const [Adopters, setAdopters] = useState([]);
    const history = useHistory();

    //Re-renders by updating Adopters to a new 
    // filtered list of Adopters that excludes the deleted Adopter
    const onDelete = async (_id) => {
        const response = await fetch(`/browse-adopters/${_id}`, { method: 'DELETE' });
        console.log(response.status);
        if (response.status === 204) {
            const newAdopters = Adopters.filter(m => m._id !== _id);
            setAdopters(newAdopters);
        } else {
            console.error(`Failed to delete Adopter with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = async AdopterToEdit => {
        setAdopterToEdit(AdopterToEdit);
        history.push("/edit-adopter");
    }

    const loadAdopters = async () => {
        const response = await fetch('/browse-adopters');
        const data = await response.json();
        setAdopters(data);
    };

    useEffect(() => {
        loadAdopters();
    }, []);

    return (
        <>
            <h2>List of Recorded Adopters</h2>
            
            {/* <AdopterList 
                Adopters={Adopters} 
                onDelete={onDelete}
                onEdit={onEdit}>
            </AdopterList> -----> Ben will create this component*/}
            <Link className="App-link" to="/">
              Return to Home Page
            </Link>
        </>
    );
}

export default BrowseAdoptersPage;