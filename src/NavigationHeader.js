import React, { Component } from 'react';

class NavigationHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            version : null
        };

        this.CharacterLink = "#/Character";
        this.StageLink = "#/Stage";
        this.ScriptSearchLink = "#/ScriptSearch";

        if(props.match !== undefined && props.match.params.patch !== undefined){
            this.version = props.match.params.patch
            this.CharacterLink = "#/Patch/" + props.match.params.patch + "/Character";
            //this.StageLink = "/#Patch/" + props.match.params.patch + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }
    }

    shouldComponentUpdate(props, state){
        if(state.version !== null){
            this.CharacterLink = "#/Patch/" + state.version + "/Character";
            //this.StageLink = "/#Patch/" + state.version + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }else{
            this.CharacterLink = "#/Character";
            this.StageLink = "#/Stage";
            this.ScriptSearchLink = "#/ScriptSearch";
        }
        return true;
    }

    static getDerivedStateFromProps(props, state) {
		if (props.match.params.patch !== undefined) {
            return {
                version : props.match.params.patch
            };
        }
        if(props.match.params.patch === undefined){
            return {
                version : null
            };
        }

		return null;
	  }

    render() {
        return (
        <div className="navigation-header">
            <span className="navigation-link">
                <a href="#/" className="hide-link">Home</a>
            </span>
            <span className="navigation-link">
                <a href={this.CharacterLink} className="hide-link">{this.state.version !== null ? "Characters (v" + this.state.version + ")" : "Characters"}</a>
            </span>
            <span className="navigation-link">
                <a href={this.StageLink} className="hide-link">Stages</a>
            </span>
            <span className="navigation-link">
                <a href="#/Patch" className="hide-link">Patches</a>
            </span>
            <span className="navigation-link">
                <a href={this.ScriptSearchLink} className="hide-link">{this.state.version !== null ? "Script Search (v" + this.state.version + ")" : "Script Search"}</a>
            </span>
            <span className="navigation-link">
                <a href="#/Glossary" className="hide-link">Glossary</a>
            </span>
            <span className="navigation-link">
                <a href="#/Resources" className="hide-link">Resources</a>
            </span>
            <span className="navigation-link">
                <a href="#/About" className="hide-link">About</a>
            </span>
        </div>
        );
      }
}

export default NavigationHeader;
