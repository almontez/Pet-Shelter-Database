import React from "react";
import { MdDeleteForever, MdEdit } from 'react-icons/md'; 

function PetRow({pet, deletePet, editPet}) {
    return (
        <tr>
            <td>{pet.pet_id}</td>
            <td>{pet.species}</td>
            <td>{pet.name}</td>
            <td>{pet.breed}</td>
            <td>{pet.age}</td>
            <td>{pet.gender}</td>
            <td>{pet.weight}</td>
            <td>{pet.color}</td>
            <td>{pet.adoption_status}</td>
            <td>{pet.adoption_fee_type}</td>
            <td><MdEdit onClick={()=>editPet(pet)}/></td>
            <td><MdDeleteForever onClick={()=>deletePet(pet)}/></td>
        </tr>
    );
}

export default PetRow;