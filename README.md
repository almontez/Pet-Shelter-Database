# Pet Shelter Database

## Table of Contents
1. [Description](#Description)
2. [Schema](#Schema)
3. [Product Spec](#Product-Spec)
5. [Sample Images](#Samples)

## Description
The Pet Shelter Database site serves pets, current pet owners, future pet owners, and the city’s animal services by helping facilitate the complex operations and relationships involved in intake and adoption. 

### App Evaluation
- **Category:** Productivity, Management
- **Type:** Relational database with a web interface
- **Market:** Pet Shelter Management Teams and City Animal Services
- **Scope:** This project includes 5 primary tables, 4 category tables, and 1 intersection table. It supports CRUD operations for all 5 primary tables.  
- **Tools:** React, SQL, JavaScript, CSS, Express, Node

## Schema 

![pet shelter database schema](https://github.com/almontez/Pet-Shelter-DB/blob/main/ReadMe%20Media/DBSchema.png)

## Product Spec

### 1. User Stories

* Users must be able to perform CRUD operations on primary tables
* Users should be able to navigate to different pages representing each primary table
* User forms for updates should be prefilled where applicable 
* Users should be able to search data for one primary table
* User search should be extensive (i.e users can search entries in more than one attribute)
* Users can view categories table by selecting the table in a drop down menu

### 2. Screen Archetypes

* **Homepage:** Provides users with links to navigate to other primary pages. Introduces the purpose of the database. 
* **Pets:** Records the details of Pets taken into the shelter. Supports all CRUD operations plus search. 
* **Adopters:** Records details of people who make requests to adopt pets from shelter. Supports Read, Write, and Delete operations. 
* **Personnel**: Records the details of people who work for the adoption site. Supports Read, Write, and Delete operations. 
* **Intakes:** Records the details of an event where an animal is taken into the shelter. Supports Read, Write, and Delete operations. 
* **Adoption Requests:** Records the details of the adoption request. Supports all CRUD operations.
* **Category Table Selection Page** Provides users with an interface for selecting a category table from a drop-down menu.
* **Personnel Status Codes:** Category table for codes related to a person’s involvement with the shelter. Supports Read, Write, and Delete operations. 
* **Pet Statuses:** Category table for codes related to the status of a pet in the shelter. Supports Read, Write, and Delete operations. 
* **Adoption Fee Codes:** Category table for codes related to adoption fees. Supports Read, Write, and Delete operations. 
* **Adoption Request Status Codes:** Category table for codes related to the status of the adoption request. Supports Read, Write, and Delete operations. 

### 3. Navigation

* Home
   * Browse Pets
   * Browse Adopters
   * Browse Personnel
   * Browse Intakes
   * Browse Adoption Requests
   * Browse Personnel Codes
   * Browse Pet Statuses
   * Browse Adoption Fee Codes
   * Browse Adoption Request Status Codes
* Pets
   * List of Recorded Pets
   * Add New Pet and Intake Form
   * Update Pet Information Form
* Adopters
   * List of Recorded Adopters
   * Add New Adopter Form
* Personnel
   * List of Recorded Personnel
   * Add New Personnel Form
* Intakes
   * List of Recorded Intakes
   * Add New Pet and Intake Form
* Adoption Requests
   * List of Recorded Adoption Request
   * Add New Adoption Request Form
   * Edit Adoption Request Form
* Category Tables
   * Personnel Codes
     * Add New Personnel Code
   * Pet Statuses
     * Add New Pet Status 
   * Adoption Fee Codes
     * Add New Adoption Code 
   * Adoption Request Status Codes
     * Add New Adoption Request Status Code

### Sample Work

## Homepage ##
![homepage](https://github.com/almontez/Pet-Shelter-DB/blob/main/ReadMe%20Media/homepage.png)

Additional sample work can be found [here](https://github.com/almontez/CS_340_SU2022_DBProject/blob/main/Pet%20Shelter%20Database%20Design%20Documentation.pdf)
