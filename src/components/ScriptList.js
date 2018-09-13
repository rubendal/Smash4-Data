import React, { Component } from 'react';
import ScriptView from './ScriptView'
import {ToHex} from '../util/util';

class ScriptList extends Component{
    constructor(props){
        super(props);

        this.state = {
            patch : props.patch,
            displayHitboxesOnly : true,
            data : props.data,
            script : null,
            scriptIndex : 0,
            allScripts : 0,
            throws : null
        };

        var scripts = this.state.data.Scripts.filter(script => script.Article === "body" && script.Hash !== 0 && script.Hitboxes.length > 0);
        var weapons = this.state.data.Scripts.filter(script => script.Article !== "body" && script.Hash !== 0 && script.Hitboxes.length > 0);

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
                    var c2 = x.HitboxActive.End - y.HitboxActive.End;
                    if(c2 === 0)
                    {
                        return x.HitboxId - y.HitboxId;
                    }

                    return c2;
                }

                return c;
            });
        });

        weapons.forEach(script => {
            script.Hitboxes.sort((x,y) =>{
            var c = x.HitboxActive.Start - y.HitboxActive.Start;

            if (c === 0)
            {
                var c2 = x.HitboxActive.End - y.HitboxActive.End;
                if(c2 === 0)
                {
                    return x.HitboxId - y.HitboxId;
                }

                return c2;
            }

                return c;
            });
        });

        this.state.script = scripts[0];
        this.state.scriptIndex = 0;
        this.state.allScripts = scripts.concat(weapons);
        this.state.throws = this.state.data.WeightDependentThrows;
        
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
                  var c2 = x.HitboxActive.End - y.HitboxActive.End;
                  if(c2 === 0)
                  {
                      return x.HitboxId - y.HitboxId;
                  }
    
                  return c2;
                }
    
                  return c;
            });
          });
    
          weapons.forEach(script => {
            script.Hitboxes.sort((x,y) =>{
              var c = x.HitboxActive.Start - y.HitboxActive.Start;
    
                if (c === 0)
                {
                  var c2 = x.HitboxActive.End - y.HitboxActive.End;
                  if(c2 === 0)
                  {
                      return x.HitboxId - y.HitboxId;
                  }
    
                  return c2;
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
              displayHitboxesOnly : !prevState.displayHitboxesOnly,
              throws : prevState.throws,
              patch : prevState.patch
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
              displayHitboxesOnly : prevState.displayHitboxesOnly,
              throws : prevState.throws,
              patch : prevState.patch
            })
          );
        }
      }

      static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
          return {
            patch : props.patch,
            displayHitboxesOnly : true,
            data : props.data
          };
        }
    
        return null;
      }

      render(){
          return (
            <div>
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
                                {script.Article === "body" ? (script.AnimationName === ToHex(script.Hash) ? script.AnimationName : `${script.AnimationName} - ${ToHex(script.Hash)}`) 
                                : `weapon/${script.Article}/${script.AnimationName}`}
                            </option>
                            );
                        }
                        return null;
                        })
                    }
                    </select>
                    </div>

                <ScriptView script={this.state.script} WeightDependentThrows={this.state.throws}/>
                </div>
            </div>
          );
      }
}

export default ScriptList;