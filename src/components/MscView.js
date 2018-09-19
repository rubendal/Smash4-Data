import React, { Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

class MscView extends Component{
    constructor(props){
        super(props);

        this.state = {
            patch : props.patch,
            data : props.data,
            fileIndex : 0,
            file : props.data[0].file,
            content : props.data[0].content
        }
    }

    ChangeScript(event){
        if(event && event.target && event.target.value){
          event.persist();
          var val = event.target.value;
          this.setState(prevState => (
            {
                patch : prevState.patch,
                data : prevState.data,
                fileIndex : val,
                file : prevState.data[val].file,
                content : prevState.data[val].content
            })
          );
        }
      }

      static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
          return {
            patch : props.patch,
            data : props.data,
            fileIndex : 0,
            file : props.data[0].file,
            content : props.data[0].content
          };
        }
    
        return null;
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
                                        {script.file}
                                    </option>
                                );
                            })
                        }
                    </select>

                    
                </div>

                <div className="msc-script">
                    <SyntaxHighlighter language="c++" customStyle={
                        {
                            "fontFamily": "Ubuntu Mono, monospace",
                            "fontSize": "1.6rem"
                        }
                    }>
                        {this.state.content}
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }
}

export default MscView;