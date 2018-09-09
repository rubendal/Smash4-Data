import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header'
import NavigationHeader from './NavigationHeader'
import Home from './Home'
import About from './About'
import Glossary from './Glossary'
import Resources from './Resources'
import CharacterList from './components/CharacterList';
import CharacterView from './components/CharacterView';
import StageList from './components/StageList';
import StageView from './components/StageView'
import PatchList from './components/PatchList';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>

          <Switch>
            <Route path={process.env.PUBLIC_URL + "/patch/:patch"} component={NavigationHeader}/>
            <Route component={NavigationHeader}/>
          </Switch>

          <Switch>            
            <Route exact path={process.env.PUBLIC_URL + "/index.html"} component={Home}/>
            <Route exact path={process.env.PUBLIC_URL + "/glossary"} component={Glossary}/>
            <Route exact path={process.env.PUBLIC_URL + "/resources"} component={Resources}/>
            <Route exact path={process.env.PUBLIC_URL + "/about"} component={About}/>

            <Route exact path={process.env.PUBLIC_URL + "/character"} component={CharacterList}/>
            <Route exact path={process.env.PUBLIC_URL + "/character/:name"} component={CharacterView}/>
            <Route exact path={process.env.PUBLIC_URL + "/stage"} component={StageList}/>
            <Route exact path={process.env.PUBLIC_URL + "/stage/:name"} component={StageView}/>

            <Route exact path={process.env.PUBLIC_URL + "/patch"} component={PatchList}/>
            <Route exact path={process.env.PUBLIC_URL + "/patch/:patch/character"} component={CharacterList}/>
            <Route exact path={process.env.PUBLIC_URL + "/patch/:patch/character/:name"} component={CharacterView}/>
            
            <Route exact path={process.env.PUBLIC_URL + "/"} component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

/*
<Route exact path="/patch/:patch/stage" component={StageList}/>
<Route exact path="/patch/:patch/stage/:name" component={StageView}/>
*/