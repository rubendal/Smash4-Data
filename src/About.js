import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div id="main" className="about">
        <h3>About</h3>

        Hi! I'm Ruben and I welcome you to the Smash Data Viewer. 
        I'm a Smash researcher and creator of the Smash Calculator 
        for <a href="https://rubendal.github.io/Sm4sh-Calculator/" target="_blank" rel="noopener noreferrer">Smash 4</a> and <a href="https://rubendal.github.io/SSBU-Calculator/" target="_blank" rel="noopener noreferrer">Smash Ultimate</a>, 
        and this site.
        This site is an <a href="https://rubendal.github.io/SSBU-Calculator/scripts.html" target="_blank" rel="noopener noreferrer">improved version of the Script Viewer on the Sm4sh Calculator</a> which 
        allows viewing Animcmd scripts on a browser to view them anywhere, this site attempts to give more data available about 
        the characters like animations length, intangibility/FAF params and tables with all hitbox parameters on each patch as well as other game data like 
        stages
        <br/>
        <br/>
        This web app was also designed for Smash Ultimate, when tools for reading game data are released for this game it would only require 
        modifying the script which processes the files that are used in this app to display the data, doing this for Smash 4 allows testing the site 
        and getting feedback
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

        Smash researcher, <a href="https://struz.github.io/smash-move-viewer">Smash Move Viewer</a> owner and <a href="https://github.com/jam1garner/Smash-Forge">Smash Forge</a> dev focused on hitbox visualization. Hitbox data parsing was done using 
        his work on Animcmd script processing on Smash Forge as a base for storing hitbox data with accurate hitbox active frames

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
