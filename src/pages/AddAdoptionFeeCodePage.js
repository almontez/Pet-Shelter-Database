import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddAdoptionFeeCodePage = () => {

    const [code, setCode] = useState('');
    const [fee, setFee] = useState('');

//Used for setting default value for dropdown menu
    // useEffect(() => {
    //     setUnit("kgs");
    // }, []);

    const history = useHistory();

    const addAdoptionFeeCode = async (event) => {
        event.preventDefault();
        const newAdoptionFeeCode = { code, fee };

        //DEBUG MESSAGE
        //console.log(`Added a new adoption_fee_code: ${JSON.stringify(newAdoptionFeeCode)}`)
        //alert(`Added a new adoption_fee_code: ${JSON.stringify(newAdoptionFeeCode)}`);

        // Makes a POST request to the server. SERVER CODE NOT IMPLEMENTED YET
        const response = await fetch('/adoption-fee-code', {
            method: 'POST',
            body: JSON.stringify(newAdoptionFeeCode),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert("Successfully added the adoption_fee_code!");
        } else {
            alert(`Failed to add adoption_fee_code, status code = ${response.status}`);
        }
        
        history.push("/browse-adoption-fee-codes");
    };

    return (
        <form className="add-row" onSubmit={addAdoptionFeeCode}>
            <h1>Add New Adoption Fee Code</h1>
            <fieldset className="add-row">
                <legend>Enter values for new adoption fee code</legend>
                <div className="add-row">
                    <label htmlFor="code_input">Code: </label>
                    <input
                        id="code_input"
                        type="text"
                        placeholder="Enter code here"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        required />
                </div>
                <div className="add-row">
                    <label htmlFor="fee_input">Fee: </label>
                    <input
                        id="fee_input"
                        type="number"
                        placeholder="Enter fee here"
                        value={fee}
                        onChange={e => setFee(e.target.value)}
                        required />
                </div>
            </fieldset>
            <br></br>
            <input className='form-submit' type="submit" value="Add AdoptionFeeCode" />
        </form>
    );
}

export default AddAdoptionFeeCodePage;