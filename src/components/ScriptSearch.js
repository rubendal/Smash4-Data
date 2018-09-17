import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';
import '../assets/css/scriptsearch.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import ScriptSearchResult from './ScriptSearchResult';

function CheckScript(regex, script){

    if(script === null){
        return {
            hasMatches : false
        };
    }

    var data = null;

    var lines = [];

    var hasMatches = false;

    var m;

    do{
        m = regex.exec(script);

        if(m !== null){
            hasMatches = true;
    
            var start = 0;
            var end = 0;
    
            //Get line beginning
    
            for (var x = m.index; x >= 0; x--) {
                if (script.charAt(x - 1) === '\n') {
                    start = x;
                    break;
                }
            }
    
            //Get line end
    
            for (x = m.index + m[m.length - 1].length; x < script.length; x++) {
                if (script.charAt(x - 1) === '\n') {
                    end = x-2; //\r\n
                    break;
                }
            }

            lines.push(script.substr(start, end-start));
        }
    }while(m);

    if (hasMatches) {
        data = lines;
    }

    return {
        hasMatches : hasMatches,
        data : data
    };
}

class ScriptSearch extends Component{
    constructor(props){
        super(props);

        this.state = {
            patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch,
            search : "",
            scriptFile : "all",
            data : null,
            results : null,
            searchError : null,
            loading : false
        };

        var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/search.json')
        .then(function(res){
            ref.setState(prevState => ({
                patch : prevState.patch,
                search : prevState.search,
                scriptFile : prevState.scriptFile,
                data : res.data,
                results : prevState.results,
                searchError : null,
                loading : prevState.loading
            }));
        })
        .catch(function(error){
            ref.setState(prevState => ({
                error : "Error"
            }));
        });
    }

    updateInput(event){
        if(event && event.target && event.target.value){
            event.persist();
            this.setState(prevState => ({
                patch : prevState.patch,
                search : event.target.value,
                scriptFile : prevState.scriptFile,
                data : prevState.data,
                results : prevState.results,
                searchError : prevState.searchError,
                loading : prevState.loading
            }));
        }
    }

    updateSelect(event){
        if(event && event.target && event.target.value){
            event.persist();
            this.setState(prevState => ({
                patch : prevState.patch,
                search : prevState.search,
                scriptFile : event.target.value,
                data : prevState.data,
                results : prevState.results,
                searchError : prevState.searchError,
                loading : prevState.loading
            }));
        }
    }

    search(){
        try{
            var regex = new RegExp(this.state.search, "g");

            var results = [];

            this.setState(prevState => ({
                patch : prevState.patch,
                search : prevState.search,
                scriptFile : prevState.scriptFile,
                data : prevState.data,
                results : prevState.results,
                searchError : prevState.searchError,
                loading : true
            }));

            for(var c = 0; c < this.state.data.length; c++){
                //Character
                var characterResults = {
                    character : this.state.data[c].Character,
                    matches: [],
                    no : 0
                };
                for(var i = 0;i < this.state.data[c].Scripts.length; i++){
                    var temp;
                    var animname = "";
                    if(this.state.scriptFile === "game" || this.state.scriptFile === "all"){
                        temp = CheckScript(regex, this.state.data[c].Scripts[i].Game);
                        if(temp.hasMatches){
                            animname = this.state.data[c].Scripts[i].AnimationName;
                            if(this.state.data[c].Scripts[i].Article !== "body")
                                animname = this.state.data[c].Scripts[i].Article + "/" + animname;
                            characterResults.matches.push({
                                script : animname,
                                matches : temp.data
                            });
                            characterResults.no += temp.data.length;
                        }
                    }
                    if(this.state.scriptFile === "expression" || this.state.scriptFile === "all"){
                        temp = CheckScript(regex, this.state.data[c].Scripts[i].Expression);
                        if(temp.hasMatches){
                            animname = this.state.data[c].Scripts[i].AnimationName;
                            if(this.state.data[c].Scripts[i].Article !== "body")
                                animname = this.state.data[c].Scripts[i].Article + "/" + animname;
                            characterResults.matches.push({
                                script : animname,
                                matches : temp.data
                            });
                            characterResults.no += temp.data.length;
                        }
                    }

                    if(this.state.scriptFile === "effect" || this.state.scriptFile === "all"){
                        temp = CheckScript(regex, this.state.data[c].Scripts[i].Effect);
                        if(temp.hasMatches){
                            animname = this.state.data[c].Scripts[i].AnimationName;
                            if(this.state.data[c].Scripts[i].Article !== "body")
                                animname = this.state.data[c].Scripts[i].Article + "/" + animname;
                            characterResults.matches.push({
                                script : animname,
                                matches : temp.data
                            });
                            characterResults.no += temp.data.length;
                        }
                    }

                    if(this.state.scriptFile === "sound" || this.state.scriptFile === "all"){
                        temp = CheckScript(regex, this.state.data[c].Scripts[i].Sound);
                        if(temp.hasMatches){
                            animname = this.state.data[c].Scripts[i].AnimationName;
                            if(this.state.data[c].Scripts[i].Article !== "body")
                                animname = this.state.data[c].Scripts[i].Article + "/" + animname;
                            characterResults.matches.push({
                                script : animname,
                                matches : temp.data
                            });
                            characterResults.no += temp.data.length;
                        }
                    }

                }
                if(characterResults.matches.length > 0){
                    results.push(characterResults);
                }
            }

            this.setState(prevState => ({
                patch : prevState.patch,
                search : prevState.search,
                scriptFile : prevState.scriptFile,
                data : prevState.data,
                results : results,
                searchError : null,
                loading : false
            }));
        }
        catch(e){
            this.setState(prevState => ({
                patch : prevState.patch,
                search : prevState.search,
                scriptFile : prevState.scriptFile,
                data : prevState.data,
                results : null,
                searchError : "Invalid regex",
                loading : false
            }));
        }
    }

    render(){
        if(this.state.data !== null){
            return (
                <div id="character-main">
                    <div className="script-search">
                        <span>
                            <input type="text" name="regex" className="search" value={this.state.search} onChange={(e) => this.updateInput(e)} placeholder="Regex"/>
                            <select value={this.state.scriptFile} onChange={(e) => this.updateSelect(e)}>
                                <option defaultValue value="all">All</option>
                                <option value="game">Game</option>
                                <option value="expression">Expression</option>
                                <option value="effect">Effect</option>
                                <option value="sound">Sound</option>
                            </select>
                            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip id={"DescriptionTooltip"}>
                                    Search
                                </Tooltip>}>
                                <button name="search" onClick={() => this.search()}>
                                    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">&#128269;</span>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip id={"DescriptionTooltip"}>
                                    Show help
                                </Tooltip>}>
                                <button name="help">
                                    ?
                                </button>
                            </OverlayTrigger>
                            </span>
                    {
                        !this.state.loading && this.state.results !== null && (
                            <div>
                                <h4>Results</h4>
                                
                                {
                                    this.state.results.map((data, index) => {
                                        return (
                                            <ScriptSearchResult key={index} data={data}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        !this.state.loading && this.state.searchError !== null && (
                            <div>
                                <ImageMessage message={this.state.searchError} image={"error.png"} alt="Error" class="invalid-regex-img"></ImageMessage>
                            </div>
                        )
                    }
                    {
                        this.state.loading && (
                            <div>
                                <ImageMessage message={"Processing"} image={"darkpit-wait2.gif"} alt="Processing"></ImageMessage>
                            </div>
                        )
                    }
                    </div>


                </div>
            )
        }
        else{
            if(this.state.error !== undefined){
                return (
                    <div id="character-main">
                        <ImageMessage message={this.state.error} image={"error.png"} alt="Error" class="invalid-char-image"></ImageMessage>
                    </div>
                )
            }
            else{
                return (
                    <div id="character-main">
                        <ImageMessage/>
                    </div>
                )
            }
        }
    }
}

export default ScriptSearch;