import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Card, Spinner, InputGroup, Overlay, Button } from '@blueprintjs/core';
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

  closeOverlay = () => this.setState({ renderOverlay: false, src: null })

  renderOverlay() {
    const {src} = this.state;

    return (
      <Overlay
        isOpen
        onClose={this.closeOverlay}>
        <Card>
          <div style={{textAlign: 'right'}}>
            <Button
              className="bp3-intent-danger"
              icon="cross"
              onClick={this.closeOverlay}
            />
          </div>
          <br/>
          <div>
            <img src={src} alt={src} />
          </div>
        </Card>
      </Overlay>
    );
  }

  render() {
    const { heroes, isLoading, search, renderOverlay, src } = this.state;

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
              <th>Publishing</th>
            </tr>
          </thead>
          <tbody>
            { heroes.map((hero) => <tr key={hero.id}>
              <td><img style={{ cursor: 'pointer' }} src={hero.images.xs} alt={hero.name} onClick={(src) => this.setState({ src: hero.images.lg, renderOverlay: true })} /></td>
              <td>{hero.name}</td>
              <td>{hero.biography.publisher}</td>
            </tr>)}
          </tbody>
        </table>}
        {renderOverlay && this.renderOverlay(src)}
       </Card>
    );
  }
}

export default App;
