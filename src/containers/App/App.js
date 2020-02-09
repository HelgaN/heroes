import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHeroes, findHero } from './../../store';
import './App.css';
import { Card, Spinner, InputGroup, Overlay, Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

class App extends Component {
  state = {
    searchName: '',
  }

  componentDidMount() {
    this.props.fetchHeroes();
  }

  closeOverlay = () => this.setState({ renderOverlay: false, src: null })

  findHero = () => {
    const { searchName } = this.state;
    this.props.findHero(searchName);
  }

  renderOverlay() {
    const {src} = this.state;

    return (
      <Overlay
        portalClassName="bp3-portal-2"
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
    const { searchName, renderOverlay, src } = this.state;
    const { heroes, fetchingHeroes } = this.props;
    console.log(this.props);

    return (
    <div className="container">
      <Card className="bp3-dark">
        <InputGroup
          large
          leftIcon="search"
          onChange={(evt) => this.setState({ searchName: evt.target.value })}
          value={searchName}
          placeholder="Search by name"
          rightElement={<Button onClick={this.findHero}>search</Button>}
        />
    </Card>
    <br/>
    <Card className="bp3-dark">
        {fetchingHeroes && <div className="spinner-wrapper"><Spinner /></div>}
        {!fetchingHeroes && <table className="bp3-html-table bp3-html-table-striped table-100">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Publishing</th>
            </tr>
          </thead>
          <tbody>
            { heroes.map((hero) =>
              <tr key={hero.id}>
                <td><img style={{ cursor: 'pointer' }} src={hero.images.xs} alt={hero.name} onClick={(src) => this.setState({ src: hero.images.lg, renderOverlay: true })} /></td>
                <td>{hero.name}</td>
                <td>{hero.biography.publisher}</td>
              </tr>)}
          </tbody>
        </table>}
        {renderOverlay && this.renderOverlay(src)}
       </Card>
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterHero: state.filterHero,
    heroes: state.heroes.filter(hero => hero.name.toLowerCase().includes(state.filterHero)),
    fetchingHeroes: state.fetchingHeroes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHeroes: bindActionCreators(fetchHeroes, dispatch),
    findHero: bindActionCreators(findHero, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
