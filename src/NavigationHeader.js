import React, { Component } from 'react';

class NavigationHeader extends Component {
    constructor(props){
        super(props);

        this.CharacterLink = process.env.PUBLIC_URL + "/Character";
        this.StageLink = process.env.PUBLIC_URL + "/Stage";

        this.version = null;

        if(props.match !== undefined && props.match.params.patch !== undefined){
            this.version = props.match.params.patch;
            this.CharacterLink = process.env.PUBLIC_URL + "/Patch/" + props.match.params.patch + "/Character";
            //this.StageLink = process.env.PUBLIC_URL + "/Patch/" + props.match.params.patch + "/Stage";
        }
    }

    render() {
        return (
        <div className="navigation-header">
            <span className="navigation-link">
                <a href={process.env.PUBLIC_URL + "/"} className="hide-link">Home</a>
            </span>
            <span className="navigation-link">
                <a href={this.CharacterLink} className="hide-link">{this.version !== null ? "Characters (v" + this.version + ")" : "Characters"}</a>
            </span>
            <span className="navigation-link">
                <a href={this.StageLink} className="hide-link">Stages</a>
            </span>
            <span className="navigation-link">
                <a href={process.env.PUBLIC_URL + "/Patch"} className="hide-link">Patches</a>
            </span>
            <span className="navigation-link">
                <a href={process.env.PUBLIC_URL + "/Glossary"} className="hide-link">Glossary</a>
            </span>
            <span className="navigation-link">
                <a href={process.env.PUBLIC_URL + "/Resources"} className="hide-link">Resources</a>
            </span>
            <span className="navigation-link">
                <a href={process.env.PUBLIC_URL + "/About"} className="hide-link">About</a>
            </span>
        </div>
        );
      }
}

export default NavigationHeader;
