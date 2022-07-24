import React, {useState} from 'react';

function PetFilter() {
    const [attribute, setAttribute] = useState('')

    return (
        <>
            <form> 
                <input type="text"
                       value={attribute}
                       onChange = {e => setAttribute(e.target.value)} 
                       placeholder="Search for pet by breed"/>
                <button onClick = {e => { 
                    alert(`You entered: ${attribute}`);
                    }}>submit</button>
            </form>
        </>
    );
}

export default PetFilter;