import React, { Component } from 'react';
import {ToHex, IsScriptEmpty, BuildScript} from '../util/util';
import Parser from 'html-react-parser';
import HitboxesView from './HitboxesView';

class ScriptView extends Component {
  constructor(props){
    super(props);

    this.state = {
        script : props.script
    };
  }

  toggleDiv(id){
    var element = document.getElementById(id);
        if(element!==null)
            element.classList.toggle("hidden");
  }

  static getDerivedStateFromProps(props, state) {
    if (props.script !== state.script) {
      return {
          script : props.script
      };
    }

    return null;
  }

  render() {
    return (
      <div>
          {
              (this.state.script.Article === "body" && (
                  <h3>{this.state.script.AnimationName}</h3>
              ))
          }
          {
              (this.state.script.Article !== "body" && (
                  <h3>{this.state.script.Article}/{this.state.script.AnimationName}</h3>
              ))
          }

        <div className="script-data">
        <table>
            <tbody>
            <tr>
                <td>
                    Subaction index
                </td>
                <td>
                    {this.state.script.SubactionIndex}
                </td>
            </tr>
            {
                this.state.script.AnimationName !== ToHex(this.state.script.Hash) && (
                    <tr>
                        <td>
                            Hash
                        </td>
                        <td>
                            {ToHex(this.state.script.Hash)}
                        </td>
                    </tr>
                )
            }
            {
                this.state.script.AnimationLength !== 0 && (
                <tr>
                    <td>
                        Animation Length
                    </td>
                    <td>
                        {this.state.script.AnimationLength} frames
                    </td>
                </tr>
                )
            }
            {
                this.state.script.Animation !== null && this.state.script.AnimationLength !== this.state.script.Animation.Length && (
                <tr>
                    <td>
                        Animation Length (without FSM)
                    </td>
                    <td>
                        {this.state.script.Animation.Length} frames
                    </td>
                </tr>
            )
            }
            {
                this.state.script.Animation !== null && this.state.script.FAF !== this.state.script.Animation.Params.FAF && (
                <tr>
                    <td>
                        FAF (without FSM)
                    </td>
                    <td>
                        {this.state.script.Animation.Params.FAF}
                    </td>
                </tr>
            )
            }
            {
                this.state.script.FAF !== 0 && (
                <tr>
                    <td>
                        FAF
                    </td>
                    <td>
                        {this.state.script.FAF}
                    </td>
                </tr>
                )
            }
            {
                this.state.script.Animation !== null && this.state.script.Animation.Params !== null && this.state.script.Animation.Params.IntangibilityStart !== 0 && (

                    <tr>
                        <td>
                        Intangibility Start Frame
                        </td>
                        <td>
                            {this.state.script.Animation.Params.IntangibilityStart}
                        </td>
                    </tr>
                )
            }
            {
                this.state.script.Animation !== null && this.state.script.Animation.Params !== null && this.state.script.Animation.Params.IntangibilityEnd !== 0 && (

                    <tr>
                        <td>
                        Intangibility End Frame
                        </td>
                        <td>
                            {this.state.script.Animation.Params.IntangibilityEnd}
                        </td>
                    </tr>
                )
            }
        </tbody>
        </table>
        </div>

        {
            this.state.script.Hitboxes.length > 0 && (
                <HitboxesView scriptId={this.state.script.Id} hitboxes={this.state.script.Hitboxes}></HitboxesView>
            )
        }

        {
            !IsScriptEmpty(this.state.script) && (
            <div>
                <h4>Animcmd</h4>
                <div id={"script-" + this.state.script.Id} className="script">
                    {Parser(BuildScript(this.state.script))}
                </div>
            </div>
            )
        }

      </div>
    );
  }
}

export default ScriptView;

/*
<React.Fragment>
                    <a id={"hitboxes-" + this.state.script.Id} className="toggle-link" onClick={() => this.toggleDiv("hitboxesView-" + this.state.script.Id)}>
                        <h4>Hitbox data</h4>
                    </a>
                    
                </React.Fragment>
*/


/* <a id={"animcmd-" + this.state.script.Id} className="toggle-link" onClick={() => this.toggleDiv("script-" + this.state.script.Id)}>
                <h4>Animcmd</h4>
                </a> */