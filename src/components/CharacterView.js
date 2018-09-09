import React, { Component } from 'react';
import '../assets/css/characters.css';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';
import ScriptView from './ScriptView'

class CharacterView extends Component {
  constructor(props){
    super(props);

    this.state = {
      patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch,
      displayHitboxesOnly : true
    };

    var ref = this;

    axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + props.match.params.name.replace(/\.+$/, "") + '/data.json').then(function(res){
      var json = res.data;

      var data = json;

      var scripts = data.Scripts.filter(script => script.Article === "body" && script.Hash !== 0 && script.Hitboxes.length > 0);
      var weapons = data.Scripts.filter(script => script.Article !== "body" && script.Hash !== 0 && script.Hitboxes.length > 0);

      scripts.sort((x,y) =>{
        return x.SubactionIndex - y.SubactionIndex;
      });

      weapons.sort((x,y) =>{
        return x.SubactionIndex - y.SubactionIndex;
      });

      //Sort Hitboxes by Hitbox Active frames and Id

      scripts.forEach(script => {
        script.Hitboxes.sort((x,y) =>{
          var c = x.HitboxActive.Start - y.HitboxActive.Start;

              if (c === 0)
              {
                  var c2 = x.HitboxId - y.HitboxId;
                  if(c2 === 0)
                  {
                      return x.HitboxActive.End - y.HitboxActive.End;
                  }

                  return x.HitboxId - y.HitboxId;
              }

              return c;
        });
      });

      weapons.forEach(script => {
        script.Hitboxes.sort((x,y) =>{
          var c = x.HitboxActive.Start - y.HitboxActive.Start;

              if (c === 0)
              {
                  var c2 = x.HitboxId - y.HitboxId;
                  if(c2 === 0)
                  {
                      return x.HitboxActive.End - y.HitboxActive.End;
                  }

                  return x.HitboxId - y.HitboxId;
              }

              return c;
        });
      });
      
      ref.setState(prevState => (
        {
          data : data,
          script : scripts[0],
          scriptIndex : 0,
          allScripts: scripts.concat(weapons),
          displayHitboxesOnly : prevState.displayHitboxesOnly
        })
      );
    })
    .catch(function(error){
      if(error.response){
        var e = "";
        if(error.response.status === 404)
          e = "Invalid character";
        else
          e = "Error";
      }else{
        e = "Error";
      }
      
      ref.setState(
        {
          error: e
        }
      );
    });

    
  }
  
  handleDisplayChange(){
    if(this.state.data !== undefined){
      var scripts = [];
      var weapons = [];

      if(!this.state.displayHitboxesOnly)
      {
        scripts = this.state.data.Scripts.filter(script => script.Article === "body" && script.Hash !== 0 && script.Hitboxes.length > 0);
        weapons = this.state.data.Scripts.filter(script => script.Article !== "body" && script.Hash !== 0 && script.Hitboxes.length > 0);
      }else
      {
        scripts = this.state.data.Scripts.filter(script => script.Article === "body" && script.Hash !== 0);
        weapons = this.state.data.Scripts.filter(script => script.Article !== "body" && script.Hash !== 0);
      }

      scripts.sort((x,y) =>{
        return x.SubactionIndex - y.SubactionIndex;
      });

      weapons.sort((x,y) =>{
        return x.SubactionIndex - y.SubactionIndex;
      });

      //Sort Hitboxes by Hitbox Active frames and Id

      scripts.forEach(script => {
        script.Hitboxes.sort((x,y) =>{
          var c = x.HitboxActive.Start - y.HitboxActive.Start;

              if (c === 0)
              {
                  var c2 = x.HitboxId - y.HitboxId;
                  if(c2 === 0)
                  {
                      return x.HitboxActive.End - y.HitboxActive.End;
                  }

                  return x.HitboxId - y.HitboxId;
              }

              return c;
        });
      });

      weapons.forEach(script => {
        script.Hitboxes.sort((x,y) =>{
          var c = x.HitboxActive.Start - y.HitboxActive.Start;

              if (c === 0)
              {
                  var c2 = x.HitboxId - y.HitboxId;
                  if(c2 === 0)
                  {
                      return x.HitboxActive.End - y.HitboxActive.End;
                  }

                  return x.HitboxId - y.HitboxId;
              }

              return c;
        });
      });
      
      this.setState(prevState => (
        {
          script: scripts[0],
          scriptIndex : 0,
          data : prevState.data,
          allScripts : scripts.concat(weapons),
          displayHitboxesOnly : !prevState.displayHitboxesOnly
        })
      );
    }
  }

  ChangeScript(event){
    if(event && event.target && event.target.value){
      event.persist();
      var val = event.target.value;
      this.setState(prevState => (
        {
          script: prevState.allScripts[val],
          scriptIndex : val,
          data: prevState.data,
          allScripts : prevState.allScripts,
          displayHitboxesOnly : prevState.displayHitboxesOnly
        })
      );
    }
  }

  render() {
    if(this.state.data !== undefined && this.state.allScripts !== undefined){
    return (
      <div id="character-main">

        <h2 id="character-name">{this.state.data.Name}</h2>

        <img id="character-image" src={"/img/renders/" + this.state.data.Name.toLowerCase().replace(/\./g,"").replace(/& /g, "") + ".png"} alt={this.state.data.Name} />

        <div id="related">
            <h4>Related sites</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Frame data</td>
                      <td><a href={"http://kuroganehammer.com/Smash4/" + this.state.data.Name.replace("&","and").replace("Mr. Game", "Game")} target="_blank" rel="noopener noreferrer">Kurogane Hammer</a></td>
                    </tr>
                    <tr>
                      <td>Hitbox visualizations </td>
                      <td><a href={"https://struz.github.io/smash-move-viewer/#/v1/" + this.state.data.GameName} target="_blank" rel="noopener noreferrer">Smash Move Viewer</a></td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div id="options">
            <h4>Options</h4>
              <input type="checkbox" onChange={() => this.handleDisplayChange()} checked={this.state.displayHitboxesOnly}/> Only display scripts with hitboxes
            </div>

            

        <div id="character-data">
        <div className="script-select">
          <h3>Script</h3>
            <select value={this.state.scriptIndex} onChange={(e) => this.ChangeScript(e)}>
              {
                this.state.allScripts.map((script,index) => {
                  if(!this.state.displayHitboxesOnly || (this.state.displayHitboxesOnly && script.Hitboxes.length > 0)){
                    return (
                      <option value={index} key={`script-${script.Id}`}>
                        {script.Article === "body" ? script.AnimationName : `weapon/${script.Article}/${script.AnimationName}`}
                      </option>
                    );
                  }
                  return null;
                })
              }
            </select>
            </div>

          <ScriptView script={this.state.script}/>
        </div>

    </div>
    );
    }else{
      if(this.state.error !== undefined){
        return (
          <div id="character-main"><ImageMessage message={this.state.error} image="/img/error.png" alt="Error" class="invalid-char-image"></ImageMessage></div>
          );
      }else{
        return (
          <div id="character-main"><ImageMessage></ImageMessage></div>
          );
      }
      
    }
  }
}

export default CharacterView;

/*{
              this.state.scripts.map(script => {
                return <ScriptView key={script.Id} script={script}></ScriptView>
              })
            }

            {
              this.state.weapons.length > 0 && (
                <div>
                  <h3>Weapons</h3>
                  {
                    this.state.weapons.map(script => {
                      return <ScriptView key={script.Id} script={script}></ScriptView>
                    })
                  }
                </div>
              )
            } */