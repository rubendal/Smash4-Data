import React, { Component } from 'react';

class Home extends Component {
    render() {
      return (
        <div id="main" className="home">
          <span >
              <a href="#/Character">
                <img src={process.env.PUBLIC_URL + "/img/characters.png"} alt="Characters"/>
              </a>
          </span>

          <span>
            <a href="#/Stage">
              <img src={process.env.PUBLIC_URL + "/img/stages.png"} alt="Stages"/>
            </a>
          </span>

          <span>
            <a href="#/Patch">
              <img src={process.env.PUBLIC_URL + "/img/patches.png"} alt="Patches"/>
            </a>
          </span>

          <span>
            <a href="#/Glossary">
              <img src={process.env.PUBLIC_URL + "/img/glossary.png"} alt="Glossary"/>
            </a>
          </span>

          <span>
            <a href="#/Resources">
              <img src={process.env.PUBLIC_URL + "/img/resources.png"} alt="Resources"/>
            </a>
          </span>

          <span>
            <a href="#/About">
              <img src={process.env.PUBLIC_URL + "/img/about.png"} alt="About"/>
            </a>
          </span>
        </div>
      );
    }
  }
  
  export default Home;
  