import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './containers/App';

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Main;
