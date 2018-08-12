# Chinese Restaurants in London Project

This project is a google map based app that allows you to search and show chinese restaurants in london and there addresses on the map. And it uses service worker to run offline.
    * NOTE: The service worker only work on in production mode and since `google-maps-react` dosent support offline, the app may fail in registering service worker.

## Getting Started
### Install and Run the Project
Download the project as zip file then uncompress it or fork it, then go to the root folder and run these commands:
* install all project dependencies with `npm install`
* start the development server with `npm start`
### Install and Run the Project in Production Mode
Download the project as zip file then uncompress it or fork it, then go to the root folder and run these commands:
* install all project dependencies with `npm run build`
* start the server with `serve -s build` then browse it locally with the port served.

## Credits
This project uses third-party works, in part or in full, namely:
*  [`google-maps-react`](https://www.npmjs.com/package/google-maps-react);
* [`escape-string-regexp`](https://www.npmjs.com/package/escape-string-regexp);
*  Fetch resturants details from [Foursquare API](https://developer.foursquare.com/) ;

## Authors
* Shoaa Alsuhaibani
