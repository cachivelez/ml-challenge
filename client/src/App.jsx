import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Router
import { HashRouter, Route } from 'react-router-dom';

// Views
import Home from './pages/Home';
import Details from './pages/Details';
import Results from './pages/Results';

// styles
import style from './styles.scss';

// Components
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.randomGen = this.randomGen.bind(this);
  }

  randomGen() {
    return Math.random();
  }

  render() {
    return (
      <HashRouter>
        <Header />
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/items/:id" component={Details} />
          <Route
            exact
            path="/items"
            render={props => <Results {...props} key={this.randomGen()} />}
          />
        </div>
      </HashRouter>
    );
  }
}

export default hot(module)(App);
