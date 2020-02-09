import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHeroById } from './../../store';
import './Hero.css';
import { Card, Spinner, Breadcrumbs } from '@blueprintjs/core';

class Hero extends Component {
  state = {}

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchHeroById(id);
  }

  renderBiography = (biography, appearance) => {
    const {fullName, alterEgos, placeOfBirth, firstAppearance, publisher, alignment} = biography;
    const aliases = biography.aliases.map((aliase) => aliase).join(', ');
    const {gender, race, eyeColor, hairColor} = appearance;
    const height = appearance.height[1];  // cm
    const weight = appearance.weight[1];  // kg

    const info = [
      {
        id: '1in',
        title: 'Genger:',
        value: gender
      },
      {
        id: '2in',
        title: 'Race:',
        value: race
      },
      {
        id: '3in',
        title: 'Full name:',
        value: fullName
      },
      {
        id: '4in',
        title: 'Eye color:',
        value: eyeColor
      },
      {
        id: '5in',
        title: 'Hair color:',
        value: hairColor
      },
      {
        id: '6in',
        title: 'Height:',
        value: height
      },
      {
        id: '7in',
        title: 'Weight:',
        value: weight
      },
      {
        id: '8in',
        title: 'Aliases:',
        value: aliases
      },
      {
        id: '9in',
        title: 'Alter egos:',
        value: alterEgos
      },
      {
        id: '10in',
        title: 'Place of birth:',
        value: placeOfBirth
      },
      {
        id: '11in',
        title: 'First appearance:',
        value: firstAppearance
      },
      {
        id: '12in',
        title: 'Publisher:',
        value: publisher
      },
      {
        id: '13in',
        title: 'Alignment:',
        value: alignment
      },
    ]

    return (
      <table className="bp3-html-table bp3-html-table-striped">
        <tbody>
          {info.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const {hero, fetchingHeroById} = this.props;
    const breadcrumbs = [
        { href: "/", icon: "folder-close", text: "All" },
        { icon: "document", text: hero && hero.name },
    ];
    console.log(this.props.hero);

    return (
      <React.Fragment>
        {fetchingHeroById && <div className="spinner-wrapper"><Spinner /></div>}

        {!fetchingHeroById && hero && <Card className="bp3-dark">
          <Breadcrumbs
             currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
             items={breadcrumbs}/>
          <h1>{hero.name}</h1>
          <div style={{ display: 'flex' }}>
            <img src={hero.images.md} alt={hero.name}/>
          {this.renderBiography(hero.biography, hero.appearance)}
          </div>
        </Card>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.hero,
    fetchingHeroById: state.fetchingHeroById,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHeroById: bindActionCreators(fetchHeroById, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
