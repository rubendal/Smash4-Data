import React, { Component } from 'react';

class ScriptSearchResult extends Component{
    constructor(props){
        super(props);

        this.state = {
            character : props.data.character,
            matches : props.data.matches,
            no : props.data.no
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state) {
          return {
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
                <table>
                    <thead>
                        <tr>
                            <td>
                                Script Name
                            </td>
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