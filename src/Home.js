import React, { Component } from 'react';
import Characters from './assets/img/characters.png';
import Stages from './assets/img/stages.png';
import Patches from './assets/img/patches.png';
import Glossary from './assets/img/glossary.png';
import Resources from './assets/img/resources.png';
import About from './assets/img/about.png';

class Home extends Component {
    render() {
      return (
        <div id="main" className="home">
          <span >
              <a href="#/Character">
                <img src={Characters} alt="Characters"/>
              </a>
          </span>

          <span>
            <a href="#/Stage">
              <img src={Stages} alt="Stages"/>
            </a>
          </span>

          <span>
            <a href="#/Patch">
              <img src={Patches} alt="Patches"/>
            </a>
          </span>

          <span>
            <a href="#/Glossary">
              <img src={Glossary} alt="Glossary"/>
            </a>
          </span>

          <span>
            <a href="#/Resources">
              <img src={Resources} alt="Resources"/>
            </a>
          </span>

          <span>
            <a href="#/About">
              <img src={About} alt="About"/>
            </a>
          </span>
        </div>
      );
    }
  }
  
  export default Home;
  