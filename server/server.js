// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT        = 7000; // 9124;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
app.get('/home', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.send("The server is running!");     // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.

app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

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
	
app.get('/adopters', function(req, res)
    {
        // Define our queries
        query1 = 'SELECT * FROM Adopters;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // SELECT * FROM Adopters
        db.pool.query(query1, function (err, results, fields){
			
			console.log(`All rows from Adopter\n`);
			console.log(results[0]);
			console.log(results[0]['first_name']);
			res.send(JSON.stringify(results));

        });
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});