import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

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
      <HashRouter>
        <div>
          <Header/>

          <Switch>
            <Route path="/patch/:patch" component={NavigationHeader}/>
            <Route component={NavigationHeader}/>
          </Switch>

          <Switch>            
            <Route exact path="/index.html" component={Home}/>
            <Route exact path="/glossary" component={Glossary}/>
            <Route exact path="/resources" component={Resources}/>
            <Route exact path="/about" component={About}/>

            <Route exact path="/character" component={CharacterList}/>
            <Route exact path="/character/:name" component={CharacterView}/>
            <Route exact path="/stage" component={StageList}/>
            <Route exact path="/stage/:name" component={StageView}/>

            <Route exact path="/patch" component={PatchList}/>
            <Route exact path="/patch/:patch/character" component={CharacterList}/>
            <Route exact path="/patch/:patch/character/:name" component={CharacterView}/>
            
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

/*
<Route exact path="/patch/:patch/stage" component={StageList}/>
<Route exact path="/patch/:patch/stage/:name" component={StageView}/>
*/