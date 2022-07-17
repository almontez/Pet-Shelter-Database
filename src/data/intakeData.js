// The id of intakes will be unique
// Pet id, processor, and drop_off_type are FKs

const intakeData = [
   { intake_id: '1', pet_id: '4', intake_date: '2022-05-11', processor: '1', drop_off_type: 'stray', intake_details: 'Poppy was found under a bridge' },
   { intake_id: '2', pet_id: '1', intake_date: '2016-12-28', processor: '1', drop_off_type: 'stray', intake_details: 'Picked up by animal services' },
   { intake_id: '3', pet_id: '3', intake_date: '2009-05-17', processor: '2', drop_off_type: 'owner surrender', intake_details: 'Pet surrended by Alice' },
   { intake_id: '4', pet_id: '2', intake_date: '2021-04-05', processor: '2', drop_off_type: 'stray', intake_details: 'Null' },
   { intake_id: '5', pet_id: '5', intake_date: '2006-09-28', processor: '1', drop_off_type: 'stray', intake_details: 'Pet found on corner of bush and black' }
  ];
  
  export default intakeData;