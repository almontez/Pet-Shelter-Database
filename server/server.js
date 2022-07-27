// App.js

/*
    SETUP
*/
var express = require('express');      // We are using the express library for the web server
var app     = express();               // We need to instantiate an express object to interact with the server in our code
const PORT  = 7000; // 9124;           // Set a port number at the top so it's easy to change in the future
var cors    = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
app.get('/home', function(req, res)             // This is the basic syntax for what is called a 'route'
    {
        res.send("The server is running!");     // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.


// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for Adopters
// ---------------------------------------------------------------------------------------------------------------------------------
app.get('/', function(req, res)
    {
        // Define our queries
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        const query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        const base = "<h1>MySQL Results:</h1>";
                        res.send(base + JSON.stringify(results));
                    });
                });
            });
        });
    });
	
// READ all Adopters
app.get('/adopters', function(req, res)
    {
        // Define our queries
        const selectAllAdoptersQuery = 'SELECT * FROM Adopters;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllAdoptersQuery, function (err, results, fields){
			
            //DEBUG MESSAGE
			//console.log(`All rows from Adopter\n`);
			//console.log(results[0]);
			//console.log(results[0]['first_name']);

			res.send(JSON.stringify(results));

        });
    });
	
	
// CREATE new Adopter
app.post('/adopter', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    const data = req.body;

    //DEBUG MESSAGE
    // console.log(`req.body received for new adopter:\n ${JSON.stringify(data)}`);
    // console.log(`req.query received for new adopter:\n ${JSON.stringify(req.query)}`);

    // Capture NULL values
    // let homeworld = parseInt(data['input-homeworld']);
    // if (isNaN(homeworld))
    // {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data['input-age']);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    
    //query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    const insertAdopterQuery = 
    `INSERT INTO Adopters (first_name, last_name, address, phone_number, email, birth_date) 
    VALUES ('${data['first_name']}', '${data['last_name']}', '${data['address']}', '${data['phone_number']}', '${data['email']}', '${data['birth_date']}');`;
    db.pool.query(insertAdopterQuery, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.sendStatus(201);
        }
    })
})

// DELETE an Adopter
app.delete('/adopter', function(req, res){                                                                
    let data = req.body;
    //let personID = parseInt(data._id);
    //let deleteBsg_Cert_People = `DELETE FROM bsg_cert_people WHERE pid = ?`;
    //let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;

    let adopter_id = parseInt(data.adopter_id);
    let deleteAdopterQuery = `DELETE FROM Adopters WHERE adopter_id = ${adopter_id};`;

    //DEBUG MESSAGE
    //console.log(`req.body received for delete adopter: ${JSON.stringify(data)}`);
    //console.log(`adopter_id received for delete adopter: ${adopter_id}`);
    //res.sendStatus(204);
  
          // Run the delete query
          db.pool.query(deleteAdopterQuery, function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
            }
        )
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for AdoptionRequests
// ---------------------------------------------------------------------------------------------------------------------------------
// READ all AdoptionRequests
app.get('/adoption-requests', function(req, res)
    {
        // Define our queries
        const selectAllAdoptionRequestsQuery = 
        `SELECT ap.adopter_pet_id, ar.adoption_request_id, a.adopter_id, pets.pet_id, CONCAT(a.first_name, ' ',  a.last_name) as adopter_name, pets.name as pet_name, p.personnel_id, CONCAT(p.first_name, ' ', p.last_name) as processor, ar.request_date, ar.amount_paid, arsc.adoption_request_status_id, arsc.status as request_status
        FROM AdoptionRequests as ar
        INNER JOIN AdoptionRequestStatusCodes as arsc on ar.application_status = arsc.adoption_request_status_id
        INNER JOIN Adopters_Pets as ap on ar.adopter_pet_id = ap.adopter_pet_id
        INNER JOIN Adopters as a on ap.adopter_id = a.adopter_id
        INNER JOIN Pets as pets on ap.pet_id = pets.pet_id
        LEFT JOIN Personnel as p on ar.processor = p.personnel_id
        ORDER BY ar.adoption_request_id;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllAdoptionRequestsQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Fetch list of Adopters for dropdown menu
app.get('/adopter-dropdown-list', function(req, res)
    {
        // Define our queries
        const selectAllAdoptersForDropDownMenuQuery = 
        `SELECT a.adopter_id, CONCAT(a.first_name, ' ',  a.last_name) as adopter_name
        FROM Adopters as a;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllAdoptersForDropDownMenuQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Fetch list of Pets for dropdown menu
app.get('/pet-dropdown-list', function(req, res)
    {
        // Define our queries
        const selectAllPetsForDropDownMenuQuery = 
        `SELECT pets.pet_id, pets.name as pet_name
        FROM Pets as pets;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllPetsForDropDownMenuQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Fetch list of Personnel for dropdown menu
app.get('/personnel-dropdown-list', function(req, res)
    {
        // Define our queries
        const selectAllPersonnelForDropDownMenuQuery = 
        `SELECT p.personnel_id, CONCAT(p.first_name, ' ',  p.last_name, ', ', pts.personnel_type) as personnel_name
        FROM Personnel as p
        INNER JOIN PersonnelTypeCodes as pts ON p.personnel_type = pts.personnel_type_id;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllPersonnelForDropDownMenuQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

    // Fetch list of Adoption Request Statuses for dropdown menu
app.get('/adoption-request-status-dropdown-list', function(req, res)
    {
        // Define our queries
        const selectAllAdoptionRequestStatusesQuery = 
        `SELECT arcs.adoption_request_status_id, arcs.status as request_status
        FROM AdoptionRequestStatusCodes as arcs;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllAdoptionRequestStatusesQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// CREATE new AdoptionRequest
app.post('/adoption-request', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    const data = req.body;

    //DEBUG MESSAGE
    console.log(`req.body received for new AdoptionRequest:\n ${JSON.stringify(data)}`);
    //res.sendStatus(201);

    // Capture 0 or ZLS values
    let processor = parseInt(data['processor']);
    if (isNaN(processor) || processor === 0 || processor === null)
    {
        processor = 'NULL';
    }

    let amount_paid = data['amount_paid'];
    if (isNaN(amount_paid) || amount_paid === "" || amount_paid === null)
    {
        amount_paid = 'NULL';
    }

    // Create the query and run it on the database
    const insertAdoptersPetsQuery = 
    `INSERT INTO Adopters_Pets (adopter_id, pet_id)
    VALUES (${data['adopter_id']}, ${data['pet_id']});`

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
        // First query inserts adopter_id and pet_id into Adopter_Pets.
        // Second query inserts adopter_pet_id and other data into AdoptionRequests.

        // Citation for following code block to retrieve the last inserted id from an insert query
        // Date: 7/23/2022
        // Adapted from:
        // Source URL: https://stackoverflow.com/a/31371153/5715461
        //  Insert adopter_id and pet_id into Adopter_Pets
        db.pool.query(insertAdoptersPetsQuery, function (error, results, fields){

                        // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                //DEBUG MESSAGE
                //console.log(`Last inserted adopter_pet_id: ${results.insertId}`);
                //console.log(`Last inserted Adopters_Pets row: ${JSON.stringify(results)}`);
                //console.log(`fields from Insert into Adopters_Pets: ${JSON.stringify(fields)}`);
                //console.log(`amount_paid after possible mod: ${amount_paid}`);
                const insertAdoptionRequestsQuery = 
                `INSERT INTO AdoptionRequests (adopter_pet_id, processor, request_date, application_status, amount_paid)
                VALUES (${results.insertId}, ${processor}, '${data['request_date']}', ${data['application_status']}, ${amount_paid});`

                //  Insert adopter_pet_id and other data into Adopter_Pets
                db.pool.query(insertAdoptionRequestsQuery, function(error, results, fields){

                    if (error) {
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else {
                        //DEBUG MESSAGE
                        //console.log(`Last inserted adoption_request_id: ${results.insertId}`);
                        //console.log(`Last inserted AdoptionRequests row: ${JSON.stringify(results)}`);
                        //console.log(`fields from Insert into AdoptionRequests: ${JSON.stringify(fields)}`);

                        res.sendStatus(201);
                    }

                });
                
            }


        });
});

// DELETE an AdoptionRequest
app.delete('/adoption-request', function(req, res){                                                                
    let data = req.body;

    let adopter_pet_id = parseInt(data.adopter_pet_id);
    let deleteAdoptionRequestQuery = `DELETE FROM Adopters_Pets WHERE adopter_pet_id = ${adopter_pet_id};`;

    //DEBUG MESSAGE
    //console.log(`req.body received for delete AdoptionRequest: ${JSON.stringify(data)}`);
    //res.sendStatus(201);
  
          // Run the delete query
          db.pool.query(deleteAdoptionRequestQuery, function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
            }
        )
});

// UPDATE an AdoptionRequest
app.put('/adoption-request', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    const data = req.body;

    //DEBUG MESSAGE
    //console.log(`req.body received for editing AdoptionRequest:\n ${JSON.stringify(data)}`);
    //res.sendStatus(200);

    // Capture 0 or ZLS values
    let processor = parseInt(data['processor']);
    if (isNaN(processor) || processor === 0 || processor === null)
    {
        console.log(`processor was updated in UPDATE AdoptionRequest: ${processor}`);
        processor = 'NULL';
    }

    let amount_paid = data['amount_paid'];
    if (isNaN(amount_paid) || amount_paid === "" || amount_paid === null)
    {
        amount_paid = 'NULL';
        console.log(`amount_paid was updated in UPDATE AdoptionRequest: ${amount_paid}`);
    }

    // Create the query and run it on the database
    const updateAdoptersPetsQuery =
    `UPDATE Adopters_Pets
    SET adopter_id = ${data['adopter_id']}, pet_id = ${data['pet_id']}
    WHERE adopter_pet_id= ${data['adopter_pet_id']};`

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
        // First query inserts adopter_id and pet_id into Adopter_Pets.
        // Second query inserts adopter_pet_id and other data into AdoptionRequests.

        // Citation for following code block to retrieve the last inserted id from an insert query
        // Date: 7/23/2022
        // Adapted from:
        // Source URL: https://stackoverflow.com/a/31371153/5715461
        //  Insert adopter_id and pet_id into Adopter_Pets
        db.pool.query(updateAdoptersPetsQuery, function (error, results, fields){

                        // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                //DEBUG MESSAGE
                //console.log(`results from UPDATE Adopters_Pets: ${JSON.stringify(results)}`);
                //console.log(`fields from Update Adopters_Pets: ${JSON.stringify(fields)}`);
                const updateAdoptionRequestsQuery = 
                `UPDATE AdoptionRequests
                SET processor = ${data['processor']}, request_date = '${data['request_date']}', application_status = ${data['application_status']}, amount_paid = ${data['amount_paid']}
                WHERE adoption_request_id = ${data['adoption_request_id']};`

                //  Insert adopter_pet_id and other data into Adopter_Pets
                db.pool.query(updateAdoptionRequestsQuery, function(error, results, fields){

                    if (error) {
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else {
                        //DEBUG MESSAGE
                        //console.log(`results from UPDATE AdoptionRequests: ${JSON.stringify(results)}`);
                        //console.log(`fields from UPDATE AdoptionRequests: ${JSON.stringify(fields)}`);

                        res.sendStatus(200);
                    }

                });
                
            }
        });
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for AdoptionRequestStatusCodes
// ---------------------------------------------------------------------------------------------------------------------------------
// READ all AdoptionRequestStatusCodes
app.get('/adoption-request-status-codes', function(req, res)
    {
        // Define our queries
        const selectAllAdoptionRequestStatusCodes = 
        `SELECT arpc.adoption_request_status_id, arpc.code, arpc.status
        FROM AdoptionRequestStatusCodes as arpc;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(selectAllAdoptionRequestStatusCodes, function (err, results, fields){
            //DEBUG MESSAGE
			//console.log(`All rows from Adopter\n`);
			//console.log(results[0]);
			//console.log(results[0]['first_name']);

			return res.status(200).send(JSON.stringify(results));
        });
    });

// CREATE new AdoptionRequestStatusCode
app.post('/adoption-request-status-code', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    const data = req.body;

    //DEBUG MESSAGE
    //console.log(`req.body received for new adopter:\n ${JSON.stringify(data)}`);
    // console.log(`req.query received for new adopter:\n ${JSON.stringify(req.query)}`);

    // Create the query and run it on the database
    const insertAdoptionRequestStatusCodeQuery =
    `INSERT INTO AdoptionRequestStatusCodes (code, status)
    VALUES ('${data['code']}', '${data['status']}');`;
    db.pool.query(insertAdoptionRequestStatusCodeQuery, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.sendStatus(201);
        }
    })
});

// DELETE an AdoptionRequestStatusCode
app.delete('/adoption-request-status-code', function(req, res){                                                                
    let data = req.body;

    const adoption_request_status_id = parseInt(data.adoption_request_status_id);
    const deleteAdoptionRequestStatusCodeQuery =
    `DELETE FROM AdoptionRequestStatusCodes 
    WHERE adoption_request_status_id = ${adoption_request_status_id}`;

    //DEBUG MESSAGE
    //console.log(`req.body received for delete adopter: ${JSON.stringify(data)}`);
    //console.log(`adopter_id received for delete adopter: ${adopter_id}`);
    //res.sendStatus(204);
  
          // Run the delete query
          db.pool.query(deleteAdoptionRequestStatusCodeQuery, function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
            }
        )
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for AdoptionFeeCodes
// ---------------------------------------------------------------------------------------------------------------------------------
// READ all AdoptionRequestStatusCodes
app.get('/adoption-fee-codes', function(req, res)
    {
        // Define our queries
        const selectAllAdoptionRequestStatusCodes = 
        `SELECT afc.adoption_fee_id, afc.code, afc.fee FROM AdoptionFeeCodes as afc;`;

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
        db.pool.query(selectAllAdoptionRequestStatusCodes, function (err, results, fields){
            //DEBUG MESSAGE
            //console.log(`results from READ from AdoptionFeeCodes: ${JSON.stringify(results)}`);

			return res.status(200).send(JSON.stringify(results));
        });
    });

// CREATE new AdoptionFeeCode
app.post('/adoption-fee-code', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    const data = req.body;

    //DEBUG MESSAGE
    //console.log(`req.body received for new AdoptionFeeCode:\n ${JSON.stringify(data)}`);
    //console.log(`req.query received for new AdoptionFeeCode:\n ${JSON.stringify(req.query)}`);

    // Create the query and run it on the database
    const insertAdoptionFeeCodeQuery =
    `INSERT INTO AdoptionFeeCodes (code, fee) 
    VALUES ('${data['code']}', ${data['fee']})`;
    db.pool.query(insertAdoptionFeeCodeQuery, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.sendStatus(201);
        }
    })
});

// DELETE an AdoptionFeeCode
app.delete('/adoption-fee-code', function(req, res){                                                                
    let data = req.body;

    const adoption_fee_id = parseInt(data.adoption_fee_id);
    const deleteAdoptionFeeCodeQuery = 
    `DELETE FROM AdoptionFeeCodes 
    WHERE adoption_fee_id = ${adoption_fee_id};`;

    //DEBUG MESSAGE
    //console.log(`req.body received for delete adopter: ${JSON.stringify(data)}`);
    //console.log(`adopter_id received for delete adopter: ${adopter_id}`);
    //res.sendStatus(204);
  
          // Run the delete query
          db.pool.query(deleteAdoptionFeeCodeQuery, function(error, rows, fields){
              if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
            }
        )
});


// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for Pets
// ---------------------------------------------------------------------------------------------------------------------------------
// READ Route: Get all data from Pets Table
app.get('/pets', function(req, res)
    {
        // Define query // Update this query later [should match one from DML file?]
        const selectAllPetsQuery = 'SELECT * FROM Pets;';

        // Execute every query in an asynchronous manner
        db.pool.query(selectAllPetsQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Delete Route for Pets by pet_id
app.delete('/pets', function(req, res) 
    {                
        // get pet_id from user request (req)                                                
        let data = req.body;
        let pet_id = parseInt(data.pet_id);

        // SQL query 
        const deletePetInstanceQuery = `DELETE FROM Pets WHERE pet_id = ${pet_id}`;

        // Run delete query
        db.pool.query(deletePetInstanceQuery, function(error, rows, fields)
            {
                if (error) {
                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    
                    // Send HTTP response 400 indicating a bad request to user
                    res.sendStatus(400);

                } else {
                    // Request Successfully Fulfilled
                    res.sendStatus(204);

                }
            }
        );
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for Personnel
// ---------------------------------------------------------------------------------------------------------------------------------
// READ Route: Get all data from Personnel Table
app.get('/personnel', function(req, res)
    {
        // Define query 
        const selectAllPersonnelQuery = 'SELECT * FROM Personnel;';

        // Execute every query in an asynchronous manner
        db.pool.query(selectAllPersonnelQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Delete Route for Personnel by personnel_id // ERROR: Request is returning undefined for personnel_id
app.delete('/personnel', function(req, res) 
    {                
        // get personnel_id from user request (req)                                             
        let data = req.body;
        console.log(data.personnel_id);
        let personnel_id = parseInt(data.personnel_id);

        // SQL query 
        const deletePersonnelInstanceQuery = `DELETE FROM Personnel WHERE personnel_id = ${personnel_id}`;

        // Run delete query
        db.pool.query(deletePersonnelInstanceQuery, function(error, rows, fields)
            {
                if (error) {
                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    
                    // Send HTTP response 400 indicating a bad request to user
                    res.sendStatus(400);

                } else {
                    // Request successfully fulfilled
                    res.sendStatus(204);
                }
            }
        );
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for PersonnelCodes
// ---------------------------------------------------------------------------------------------------------------------------------
// READ Route: Get all data from PersonnelCodes Table
app.get('/personnel-codes', function(req, res)
    {
        // Define query 
        const selectAllPersonnelCodesQuery = 'SELECT * FROM PersonnelTypeCodes;';

        // Execute every query in an asynchronous manner
        db.pool.query(selectAllPersonnelCodesQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Delete Route for PersonnelTypeCodes by personnel_type_id // ERROR: Request is returning undefined for personnel_type_id
app.delete('/personnel-codes', function(req, res) 
    {                
        // get personnel_type_id from user request (req)                                                
        let data = req.body;
        console.log(data.personnel_type_id)
        let code_id = parseInt(data.personnel_type_id);

        // SQL query 
        const deletePersonnelCodeQuery = `DELETE FROM PersonnelTypeCodes WHERE personnel_type_id = ${code_id}`;

        // Run delete query
        db.pool.query(deletePersonnelCodeQuery, function(error, rows, fields)
            {
                if (error) {
                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    
                    // Send HTTP response 400 indicating a bad request to user
                    res.sendStatus(400);

                } else {
                    // Request Successfully Fulfilled 
                    res.sendStatus(204);

                }
            }
        );
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for Intakes
// ---------------------------------------------------------------------------------------------------------------------------------
// READ Route: Get all data from Intakes Table
app.get('/intakes', function(req, res)
    {
        // Define query 
        const selectAllIntakesQuery = 'SELECT * FROM Intakes;';

        // Execute every query in an asynchronous manner
        db.pool.query(selectAllIntakesQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Delete Route for Intakes by inake_id
app.delete('/intakes', function(req, res) 
    {                
        // get pet_id from user request (req)                                                
        let data = req.body;
        let intake_id = parseInt(data.intake_id);

        // SQL query 
        const deleteIntakeInstanceQuery = `DELETE FROM Intakes WHERE intake_id = ${intake_id}`;

        // Run delete query
        db.pool.query(deleteIntakeInstanceQuery, function(error, rows, fields)
            {
                if (error) {
                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    
                    // Send HTTP response 400 indicating a bad request to user
                    res.sendStatus(400);

                } else {
                    // Request successfully fulfilled
                    res.sendStatus(204);

                }
            }
        )
});

// ---------------------------------------------------------------------------------------------------------------------------------
// CRUD Routes for PetStatuses
// ---------------------------------------------------------------------------------------------------------------------------------
// READ Route: Get all data from PetStatuses Table
app.get('/pet-statuses', function(req, res)
    {
        // Define query 
        const selectAllPetStatusesQuery = 'SELECT * FROM PetStatuses;';

        // Execute every query in an asynchronous manner
        db.pool.query(selectAllPetStatusesQuery, function (err, results, fields){

			res.send(JSON.stringify(results));

        });
    });

// Delete Route for Pets by pet_id // ERROR: Request is returning undefined for pet_status_id
app.delete('/pet-statuses', function(req, res) 
    {                
        // get _id from user request (req)                                                
        let data = req.body;
        let status_id = parseInt(data.pet_status_id);

        // SQL query 
        const deletePetStatusQuery = `DELETE FROM PetStatuses WHERE pet_status_id = ${status_id}`;

        // Run delete query
        db.pool.query(deletePetStatusQuery, function(error, rows, fields)
            {
                if (error) {
                    // Log the error to the terminal so we know what went wrong
                    console.log(error);
                    
                    // Send HTTP response 400 indicating a bad request to user
                    res.sendStatus(400);

                } else {
                    // Request Successfully Fulfilled
                    res.sendStatus(204);

                }
            }
        );
});

/**
 * Error handling middleware.
 */
 app.use((error, req, res, next) => {
    console.log(`Unhandled error ${error}. URL = ${req.originalUrl}, method = ${req.method}`);
    res.status(500).send('500 - Server Error!');
  });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});