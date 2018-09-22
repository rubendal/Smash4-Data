import React, { Component } from 'react';

import axios from 'axios';
import Parser from 'html-react-parser';
import {FormatMscScript} from '../util/util';

class MscView extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            patch : props.patch,
            character : props.character,
            data : props.data,
            fileIndex : 0,
            file : props.data[0],
            content : null
        }
    }

    ChangeScript(event){
        if(event && event.target && event.target.value){
          event.persist();
          var val = event.target.value;
          this.setState(prevState => {
                prevState.fileIndex = val;
                prevState.file = prevState.data[val];
                return prevState;
            }
            );
        }
      }

      static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data ||
            props.patch !== state.patch ||
            props.character !== state.character) {
          return {
            patch : props.patch,
            character : props.character,
            data : props.data,
            fileIndex : 0,
            file : props.data[0]
          };
        }
    
        return null;
      }

      loadScript(){
          this.setState(prevState => {
              prevState.content = null;
              return prevState;
          });

          var ref = this;

          axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + this.state.character.replace(/\.+$/, "") + '/' +
           this.state.file.replace("/","_") + '.txt')
           .then(function(res){
                ref.setState(prevState => {
                    prevState.content = res.data;
                    return prevState;
                });
           });
      }

    render(){
        return (
            <div id="character-data">
                <div className="script-select">
                    <h3>MSC File</h3>
                    <select value={this.state.fileIndex} onChange={(e) => this.ChangeScript(e)}>
                        {
                            this.state.data.map((script,index) => {
                                return (
                                    <option value={index} key={`script-${index}`}>
                                        {script}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <span className="msc-buttons">
                        <button name="loadScript" onClick={() => this.loadScript()}>Load script</button>
                        <a href={process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + this.state.character.replace(/\.+$/, "") + '/' +
                            this.state.file.replace("/","_") + '.txt'} target="_blank" rel="noopener noreferrer">
                            <button name="downloadScript">Download script</button>
                        </a>
                    </span>
                    
                </div>

                <div className="msc-script">
                
                    {this.state.content !== null && 
                        Parser(FormatMscScript(this.state.content))}
                </div>
            </div>
        )
    }
}

export default MscView;