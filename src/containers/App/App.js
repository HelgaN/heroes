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

  closeOverlay = () => this.setState({ renderOverlay: false, src: null, name: null })

  findHero = () => {
    const { searchName } = this.state;
    this.props.findHero(searchName);
  }

  renderOverlay() {
    const {src, name} = this.state;

    return (
      <Overlay
        portalClassName="bp3-portal-2"
        isOpen
        onClose={this.closeOverlay}>
        <Card className="bp3-dark" interactive>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>{name}</h2>
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

    return (
    <React.Fragment>
      <Card className="bp3-dark" interactive>
        <InputGroup
          large
          leftIcon="search"
          onChange={(evt) => this.setState({ searchName: evt.target.value })}
          value={searchName}
          placeholder="Search by name"
          rightElement={<Button intent="success" onClick={this.findHero}>search</Button>}
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
                <td><img style={{ cursor: 'pointer' }} src={hero.images.xs} alt={hero.name} onClick={(src) => this.setState({ src: hero.images.lg, name: hero.name, renderOverlay: true })} /></td>
                <td><a href={`${hero.id}`}>{hero.name}</a></td>
                <td>{hero.biography.publisher}</td>
              </tr>)}
          </tbody>
        </table>}
        {renderOverlay && this.renderOverlay(src)}
       </Card>
     </React.Fragment>
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
