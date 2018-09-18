import React, { Component } from 'react';

class ScriptSearchResult extends Component{
    constructor(props){
        super(props);

        this.state = {
            scriptFile : props.scriptFile,
            character : props.data.character,
            matches : props.data.matches,
            no : props.data.no
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state) {
          return {
            scriptFile : props.scriptFile,
            character : props.data.character,
            matches : props.data.matches,
            no : props.data.no
          };
        }
    
        return null;
      }

    render(){
        return (
            <div className="character-result-table">
                <h3>{this.state.character}</h3>
                <table className="search-results">
                    <thead>
                        <tr>
                            <td>
                                Script Name
                            </td>
                            {
                                this.state.scriptFile === "all" && (
                                    <td>
                                        Script File
                                    </td>
                                )
                            }
                            <td>
                                Matches
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {
                            this.state.matches.map((script, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {script.script}
                                        </td>
                                        {
                                            this.state.scriptFile === "all" && (
                                                <td>
                                                    {script.file}
                                                </td>
                                            )
                                        }
                                        <td>
                                            {
                                                script.matches.map((line, index) => {
                                                    return (
                                                        <div key={`${script.animname}-${index}`}>
                                                            {line}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}

export default ScriptSearchResult;