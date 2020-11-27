import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css/App.css';


import RouterComponent from './component/RouterComponent.jsx';

class App extends Component {
  // qui mi farai il rendering delle pagine che elenco
  render() {

    return (

      <div className="container">
        <RouterComponent/>
      </div>

    );

  }
}

export default App;
