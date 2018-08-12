import React, { Component } from 'react';
import './App.css';
import { allLocations } from './allLocations.js'
import GoogleMap from './Map.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: allLocations,
    }
}
render() {
  return (
    <div className='App'>
      <GoogleMap google={this.props.google} locations= {this.state.locations}
      />
    </div>

  );
}
}
export default App
