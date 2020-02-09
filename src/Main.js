import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './containers/App';
import Hero from './containers/Hero';

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/:id" component={Hero} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Main;
