# EMPLOYEE NAVIGATION FORM

<!-------------------------------------------------------------------------------------------------------------------------------------->

<div id="top"></div>

## TABLE OF CONTENTS

- [Description](#description)
- [About JsonPowerDB & Benefits of Using JsonPowerDB](#benefits-of-JSDB)
- [Features](#features)
- [Technology Used](#technology-used)
- [Navigation Buttons ](#navigation-buttons)
- [Control Buttons](#control-buttons)
- [Project Status](#project-status)
- [Sources](#sources)

<!-------------------------------------------------------------------------------------------------------------------------------------->

## Description
The Project Management Form is a web application for handling project records. It interacts with the PROJECT-TABLE in the COLLEGE-DB database, enabling users to add, update, and reset project information. The form includes validation to ensure all fields are completed before saving or updating records. JsonPowerDB is used for data storage, offering a streamlined and efficient solution for managing project data.
<br>

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## About JsonPowerDB & Benefits of Using JsonPowerDB

JsonPowerDB is a Real-time, High Performance, Lightweight and Simple to Use, Rest API based Multi-mode DBMS. JsonPowerDB has ready to use API for Json document DB, RDBMS, Key-value DB, GeoSpatial DB and Time Series DB functionality. JPDB supports and advocates for true serverless and pluggable API development.

- **Fast and Efficient**: JsonPowerDB offers high-speed performance due to its in-memory data processing capabilities.
- **Flexibility**: It supports various types of data manipulations, including querying, updating, and deleting, using simple JSON queries.
- **Ease of Use**: JsonPowerDB's JSON-based querying language is straightforward and easy to learn, simplifying database interactions.
- **Scalability**: Designed to handle large amounts of data efficiently, making it suitable for applications with growing data needs.

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Features of Employee Navigation Form

- When new button is clicked, other control buttons and navigation button are disabled
- When multiple records in database , it provides controls on navigation.
- When last record is displayed, the last and next navigation buttons are disabled.
-When first record is displayed, the first and previous navigation buttons are disabled.
-Data stored at User's side in JsonPowerDb Database


<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Technology Used

<p>
  <a href="https://www.w3schools.com/html/"> <img src="https://img.icons8.com/color/70/000000/html-5--v1.png" alt="HTML" /></a>
  <a href="https://www.w3schools.com/css/"> <img src="https://img.icons8.com/color/70/000000/css3.png" alt="CSS" /></a>
  <a href="https://www.w3schools.com/js/"><img src="https://img.icons8.com/color/70/000000/javascript--v1.png" alt="JS" /></a>
  <a href="https://www.w3schools.com/js/"><img src="data:image/png;base64,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" alt="jQuery" /></a>" alt="jQuery" /></a>
  <a href="https://www.w3schools.com/js/"><img src="https://media.licdn.com/dms/image/D4D22AQE6KGrO7C3E0A/feedshare-shrink_2048_1536/0/1701452875140?e=2147483647&v=beta&t=hsgF3TdGmjJtIHTMO78C8fSLjpClfaS6ISdsDi4eKig" alt="JS" height="80px"  width="80px"/></a>
   <a href="https://www.w3schools.com/js/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzNUwj31PQCq8q6WU1rZB-hUxLNKj5j2A8gg&s" alt="AJAX"height="80px"  width="80px /></a>" alt="AJAX" /></a>
 
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Navigation Buttons

- **First**: Navigate to the first employee record in the database.
- **Previous**: Navigate to the previous employee record relative to the current record.
- **Next**: Navigate to the next employee record relative to the current record.
- **Last**: Navigate to the last employee record in the database.

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Control Buttons

- **New**: Prepare the form for new data entry by clearing existing data.
- **Save**: Save the current form data as a new record or update an existing record.
- **Edit**: Enter edit mode to modify the current record.
- **Change**: Apply changes to the current record with updated details.
- **Reset**: Return the form to its initial state, clearing all fields and disabling editing.    
     
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Project Status

Currently in development with version 1.2.0 integrating JsonPowerDB. Future updates will focus on additional features and enhancements based on user feedback.

<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

## Sources

[JsonPowerDB Documentation](https://login2explore.com/jpdb/docs.html) :  Comprehensive documentation for JsonPowerDB, including setup, queries, and API references.🌟

  <p align="right">(<a href="#top">back to top</a>)</p>

