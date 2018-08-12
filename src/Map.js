import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import $ from 'jquery'

class GoogleMap extends Component {
	constructor(props){
  	super(props);
  	this.state = {
  		query: '',
  		showingInfoWindow: false,
	    place: [{}],
  	}
    /*
    * binding this to event-handler functions
    */
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  /*
  * Fetch restaurants details from foursquare api (address and city just used here)
  */
  locationDetails(lat, lng, title) {
  	$.ajax({
      url: 'https://api.foursquare.com/v2/venues/search?client_id=VWH04OGZVT3SDRAN3AC4I02MCJXMNHNO30PKLME2KOZQRB1Q&client_secret=PYMI03RML0GY0V0U2KHGLCF4GVXX1KRGXW4ZKV4UIKNZFJHT&ll='+lat+','+lng+'&query='+title+'&v=20180323&limit=10000',
      type: 'GET',
      async: false,
      dataType: 'json',
    }).done(function(data){
      console.log('success')
      this.setState({
          place: data.response.venues.filter(function (item) {
            return item.name.toLowerCase() === title.toLowerCase();
          }).map(data => data.location)
        })
    }.bind(this))
    .fail(function(){
      console.log('error')
      this.setState({
        place: null
      })
    }.bind(this),)
    .always(function(){
      console.log('complete')
    })
  }

  /*
  * Call locationDetails method to get address and city of this restuarant
  * and flag showingInfoWindow to be opened
  */
  onMarkerClick(lat, lng, title) {
    this.locationDetails(lat, lng, title);
    this.setState({    			
      showingInfoWindow: true,
      lat: lat,
      lng: lng,
      title: title,
    });
  }

  /*
  * Close opened info windows and clear actived markers
  */
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
     
  render(){
  	const allLocations = this.props.locations;
  	const { query } = this.state;
  	let showingRestaurants

    /*
    * Filter list items depending on search query
    */
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingRestaurants = allLocations.filter((location) => match.test(location.title))
    } else {
      showingRestaurants = allLocations
    }
    return(
    	<div role='main' tabIndex='-1'>
      <div id='listView-container' role='contentinfo' tabIndex='-1'>
        <div id='listView' aria-label='Top Chinese Restaurant in London'>
          <h1 id='listView-header' tabIndex='0 ' role='banner'>Chinese Restaurants in London</h1>
          <input id='search-restaurant'
            role='search'
            tabIndex='0'
            type='text'
            placeholder='Search restaurants'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <ul id='listView-content' role='navigation' aria-labelledby='list of restaurant' tabIndex='1'>
            { showingRestaurants.map((location,index) => {
                return(
                  <li key={index} tabIndex={index+2}
                    id='button'
                     aria-label={location.title}
                      onClick={() => this.onMarkerClick(location.location.lat, location.location.lng, location.title)}
                      value={location.title}>
                      {location.title}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>

      <div id='map-container' role='contentinfo' tabIndex='-1'>
        <Map
        	google={this.props.google}
          role="application"
        	zoom={13}
  				initialCenter={{ lat: parseFloat(51.5073509), lng: parseFloat(-0.1277590) }}
          onClick={this.onMapClick}
        	>
        	{
          	showingRestaurants.map((location, index) => 
          		<Marker 
          			name= {location.title}
          			key= {index}
          			position= {{lat: location.location.lat, lng: location.location.lng}}
          			onClick={() => this.onMarkerClick(location.location.lat, location.location.lng, location.title)}
          		/>
          		)
          }
          <InfoWindow
            position={{lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng)}}
            visible={this.state.showingInfoWindow}>
          	<div>
            	{this.state.place ?
            	<p tabIndex='1'><h3>{this.state.title}</h3>
            	Address: {this.state.place[0].address}, {this.state.place[0].city}
            	</p> 
              : <p><h3>Error: </h3>Cannot Retrieve Information</p>}
            </div>
          </InfoWindow>
        </Map>
      </div>
    </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAaLH4oM9LlCLcQBju_guoRQ7u5sVSvjjE',
})(GoogleMap);