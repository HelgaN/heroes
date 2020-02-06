import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Card, Spinner, InputGroup } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

class App extends Component {
  state = {
    heroes: [],
    search: '',
    isLoading: true
  }

  componentDidMount() {
    axios.get(`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json`)
     .then((resp) => {
       console.log(resp.data);
       this.setState({ heroes: resp.data, isLoading: false })
     })
  }

  render() {
    const { heroes, isLoading, search } = this.state;

    return (
      <Card className="bp3-dark">
        <InputGroup
          large
          leftIcon="search"
          onChange={(evt) => this.setState({ search: evt.target.value })}
          value={search}
        />
        {isLoading && <Spinner />}
        {!isLoading && <table className="bp3-html-table bp3-html-table-striped">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { heroes.map((hero) => <tr key={hero.id}>
              <td><img src={hero.images.xs} alt={hero.name} /></td>
              <td>{hero.name}</td>
            </tr>)}
          </tbody>
        </table>}
       </Card>
    );
  }
}

export default App;
