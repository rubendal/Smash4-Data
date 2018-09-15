import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div id="main" className="about">
        <h3>About</h3>

        Hi! I'm Ruben and I welcome you to the Smash 4 Data Viewer. 
        I'm a Smash researcher and creator of the Smash Calculator 
        for <a href="https://rubendal.github.io/Sm4sh-Calculator/" target="_blank" rel="noopener noreferrer">Smash 4</a> and <a href="https://rubendal.github.io/SSBU-Calculator/" target="_blank" rel="noopener noreferrer">Smash Ultimate</a>.
        This site is based on the <a href="https://rubendal.github.io/SSBU-Calculator/scripts.html" target="_blank" rel="noopener noreferrer">Sm4sh Calculator script viewer</a> which 
        allows viewing Animcmd scripts on a browser to view them anywhere, this site attempts to give more data available about 
        the characters like animations length, intangibility/FAF and tables with all hitbox parameters as well as other game data like 
        stage's lvd file data (collisions, camera bounds, blast zones, character and item spawns and character respawns)
        <br/>
        <br/>
        This app was designed for Smash Ultimate but doing it for Smash 4 as well for testing. The objective of making it is 
        to allow viewing the game's data as soon as the tools needed to read the game files are available and the data can be interpreted by researchers 
        (example: knowing which values are hitbox data) and making it public using a script which parses it and stores it into files this app uses to generate the views that display the data
        <br/>
        <br/>
        <h3>Special Thanks</h3>

        <h4>
            Sammi Husky (<a href="https://twitter.com/SammiHusky">@SammiHusky</a>)
        </h4>

        Smash researcher and developer of <a href="https://github.com/Sammi-Husky/Sm4sh-Tools">SALT</a>, without his tools getting the data through a script and making this site work 
        would be impossible

        <br/><br/>
        <h4>
            Struz (<a href="https://twitter.com/StruzSmash">@StruzSmash</a>)
        </h4>

        Smash researcher, <a href="https://struz.github.io/smash-move-viewer">Smash Move Viewer</a> owner and <a href="https://github.com/jam1garner/Smash-Forge">Smash Forge</a> dev focused on hitbox visualization. Script for hitbox data parsing 
        used for this app was based on his work on Smash Forge Animcmd script processing

        <br/><br/>
        <h4>
            Kurogane Hammer (<a href="https://twitter.com/KuroganeHammer">@KuroganeHammer</a>)
        </h4>

        Smash Frame data man, this site is inspired by his <a href="http://kuroganehammer.com/Smash4">frame data repository</a> which allows people to learn character's frame data and attributes

      </div>
    );
  }
}

export default About;
