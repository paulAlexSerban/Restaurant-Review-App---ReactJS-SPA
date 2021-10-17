# ReactJS - Restaurant Review - Single Page App - [Live](https://restaurant-review-app-react.netlify.app/)
> [OpenClassrooms](https://openclassrooms.com/) - Front End Developer Path - Project 7 - ReactJS Restaurant Review Single Page Application

## Project Brief 
  After choosing to start in the restaurant review business, you goal is to create an easy-to-use, simple service that offers reviews of restaurants around you.

  For this project you will need to use external API such as Google Maps and Google Places and integrate the information retrieved from these API's.

  The project needs to be developed using Object-Oriented Programming JavaScript.

### Step 1 - Restaurants
  * Integrate Google Maps API
  * Integrate Google Street View API
  * Display a list of restaurants from a JSON file

  - The Google Maps map will focus immediately on the position of the user. You'll use the JavaScript geo-location API. A specific color marker should be shown at the user's current location.
  - A list of restaurants is provided as JSON data in a separate file. Normally, this data would be returned to the backend of your application by an API, but for this exercise, it's sufficient just to load the list of restaurants directly into memory!
  - Show restaurants on the map based on their GPS coordinates. Restaurants that are currently visible on the map should be displayed in list form on the side of the map as mentioned above. You will see the average reviews of each restaurant (ranging from 1 to 5 stars). These ratings come from your JSON file (not real reviews).
  - When you click on a restaurant, the list of reviews should be shown. Also show the Google Street View photo via the corresponding API! 
  - A filter tool allows the display of restaurants that have between X and Y stars. The map should be updated in real-time to show the corresponding restaurants.

### Step 2 - Add restaurants and reviews
  * Implement the possibility to add a review about an existing restaurant
  * Implement the possibility to add a restaurant by clicking on a specific place the map

  - Once a review or restaurant has been added, it should appear immediately on the map. A new marker will show the position of the new restaurant.
  - The information will not be saved if they leave the page (it will just be saved in memory for the duration of the visit).

### Step 3 - Integration with Google Places API
  * Implement the search API to find restaurants in a particular display area
  * Use Google Places API to retrieve restaurants and reviews

## How to Install, Run, Develop and Build

* After cloning the project, inside the newly created directory, run `$ npm install` to install the Npm dependencies
* To run the project, run `$ npm run` - the project will be available [http://localhost:3000](http://localhost:3000) to view in the browser (the page will reload if you make any edits)
* To build the project for production to the `./build` directory run `$ npm run build` - See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
