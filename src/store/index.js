import axios from 'axios';

const FETCH_HEROES = 'FETCH_HEROES';
const FETCH_HEROES_SUCCESS = 'FETCH_HEROES_SUCCESS';
const FETCH_HEROES_FAIL = 'FETCH_HEROES_FAIL';

const FETCH_HERO_BY_ID = 'FETCH_HERO_BY_ID';
const FETCH_HERO_BY_ID_SUCCESS = 'FETCH_HERO_BY_ID_SUCCESS';
const FETCH_HERO_BY_ID_FAIL = 'FETCH_HERO_BY_ID_FAIL';

const FIND_HERO = 'FIND_HERO';

const initialState = {
  heroes: [],
  filterHero: '',
  fetchingHeroes: false,
  hero: null,
  fetchingHeroById: false
};

export { initialState };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEROES:
      return {
        ...state,
        fetchingHeroes: true
      }
    case FETCH_HEROES_SUCCESS:
      return {
        ...state,
        fetchingHeroes: false,
        fetchingHeroesError: null,
        heroes: action.data
      }
    case FETCH_HEROES_FAIL:
      return {
        ...state,
        fetchingHeroes: false,
        fetchingHeroesError: action.error
      }
    case FETCH_HERO_BY_ID:
      return {
        ...state,
        fetchingHeroById: true
      }
    case FETCH_HERO_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingHeroById: false,
        fetchingHeroByIdError: null,
        hero: action.data
      }
    case FETCH_HERO_BY_ID_FAIL:
      return {
        ...state,
        fetchingHeroById: false,
        fetchingHeroByIdError: action.error
      }
    case FIND_HERO:
      return {
        ...state,
        filterHero: action.name
      }
    default:
      return state;
  }
}

export const fetchHeroes = (heroes) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_HEROES,
   })

   axios.get(`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json`)
     .then((resp) => {
       if (resp.data) {
         dispatch({
           type: FETCH_HEROES_SUCCESS,
           data: resp.data
         })
       } else {
         dispatch({
           type: FETCH_HEROES_FAIL,
           error: new Error('error')
         })
       }
    })
  }
}

export const fetchHeroById = (id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_HERO_BY_ID,
   })

   axios.get(`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/id/${id}.json`)
     .then((resp) => {
       if (resp.data) {
         dispatch({
           type: FETCH_HERO_BY_ID_SUCCESS,
           data: resp.data
         })
       } else {
         dispatch({
           type: FETCH_HERO_BY_ID_FAIL,
           error: new Error('error')
         })
       }
    })
  }
}

export const findHero = (name) => {
  return (dispatch) => {
    dispatch({
      type: FIND_HERO,
      name
   })
  }
}
