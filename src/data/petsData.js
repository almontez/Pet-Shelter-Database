// The id of pets will be unique
// Adoption_status and Adoption_fee_type are FKs

const petsData = [
    { pet_id: 1, species: 'dog', name: 'Cooper', breed: 'labrador mix', age: 4.33, gender: 'M', weight: 77.19, coat_color: 'chocolate', adoption_status: 'HOLD', adoption_fee_type: 'adult' },
    { pet_id: 2, species: 'dog', name: 'Elsa', breed: 'husky mix', age: 0.16, gender: 'F', weight: 8.75, coat_color: 'black and white', adoption_status: 'ADPT', adoption_fee_type: 'puppy' },
    { pet_id: 3, species: 'dog', name: 'Stitch', breed: 'chihuahua mix', age: 8, gender: 'M', weight: 19.75, coat_color: 'tan', adoption_status: 'APRV', adoption_fee_type: 'senior' },
    { pet_id: 4, species: 'cat', name: 'Poppy', breed: 'domestic shorthair mix', age: 2, gender: 'F', weight: 11, coat_color: 'orange', adoption_status: 'APRV', adoption_fee_type: 'adult' },
    { pet_id: 5, species: 'cat', name: 'Hugh', breed: 'domestic shorthair mix', age: 0.25, gender: 'M', weight: 2.19, coat_color: 'black', adoption_status: 'ADPT', adoption_fee_type: 'kitten' }
  ];
  
  export default petsData;