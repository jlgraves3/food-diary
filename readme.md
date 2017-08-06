# Project 2 - Food Diary

By Julia Graves

### Description
This app allows users to sign in and keep a running record of everything they eat with calorie information. Users can search for an item they want to add to their food diary through the app, and it will return results with calorie data.

### Wireframes


### User Stories
When the user is on the home page (not logged in) they can either log in or register, then they will be redirected to the food log for the current day. This app requires the user to be logged in.

When the user is on their food diary page for today, they can add an item or view a specific item that has already been logged.

When the user is viewing specific food entry in their log, they can edit or delete the item.

When the user chooses to add an item they can either search for the item via the nutritionix database and select an appropriate result or enter the item manually.

When the user is in the archive they can view (but cannot edit) their food logs for the past 30 days.

When the user is viewing their stats, they can click on any of the past 12 months to view a line graph of the total calories eaten each day and the average daily calories consumed for that month.


### Technologies 
- HTML
- CSS
- Javascript
- postgreSQL

### APIs
- __Nutritionix:__ includes a large search engine containing nutrition information on foods.

### Modules
- ```express``` used for managing routes
- express-session
- morgan
- dotenv
- pg-promise
- nodemon
- bcryptjs
- body-parser
- method-override
- cookie-parser
- passport 
- passport-local
- ejs
- ```isomorphic fetch``` used for requests.
- ```moment``` used for getting and formatting time and dates.
- ```chart.js``` used for displaying data in a line graph.
  
### Code Snippet

### Improvements
I would ideally like to have the line graph display formatted dates on the X-axis instead of just the day number (i.e. 'Aug 31' instead of just '31'), and also have datapoints as 0 calories for days without entries so that days aren't skipped on the graph.

### How to Run Locally
Navigate to the project directory in the terminal and run ```npm run dev``` in the command line. The app will run on ```localhost:3000```.


The technologies, APIs, and modules you used and a description of each
A code snippet of a part of the app you're particularly proud of
Any things you plan to fix or features you plan to add
Instructions for downloading the code and running it on localh
