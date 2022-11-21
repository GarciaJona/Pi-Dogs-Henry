import {
  GET_ALL_DOGS,
  ORDER_BY_NAME,
  ORDER_BY_BD,
  GET_DOG_NAME,
  GET_TEMPS,
  CREATE_DOG,
  GET_DETAIL,
  ORDER_BY_TEMPS,
  ORDER_BY_WEIGHT,
  CLEAR_DOG,
} from '../actions';

const initialState = {
  allDogs: [],
  allDogs2: [], // Siempre lleno, no lo modifico
  dogDetail: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        allDogs2: action.payload,
      };

    case ORDER_BY_NAME:
      let dogSorted =
        action.payload === 'Asc'
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.allDogs.sort((b, a) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            });

      return {
        ...state,
        allDogs: dogSorted,
      };

    case ORDER_BY_WEIGHT:
      let dogSorted2 =
        action.payload === 'orderHEAVY'
          ? state.allDogs.sort((b, a) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return 1;
              if (parseInt(a.weight) < parseInt(b.weight)) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return 1;
              if (parseInt(a.weight) < parseInt(b.weight)) return -1;
              return 0;
            });
      return {
        ...state,
        allDogs: dogSorted2,
      };

    case ORDER_BY_BD:
      const orderCreated =
        action.payload === 'orderBD'
          ? state.allDogs2.filter((el) => el.createdAt)
          : state.allDogs2.filter((el) => !el.createdAt);
      return {
        ...state,
        allDogs:
          action.payload === 'orderALL'
            ? Array.from(new Set(state.allDogs.concat(state.allDogs2)))
            : orderCreated,
      };

    case ORDER_BY_TEMPS:
      const filteredDogs = [];
      state.allDogs2.map((dog) => {
        const dogTemperament = dog?.temperaments
          ?.split(',')
          .filter((temperamentInDog) => {
            return temperamentInDog.trim() === action.payload.trim();
          });

        if (dogTemperament && dogTemperament.length > 0) {
          filteredDogs.push(dog);
        }
      });
      return {
        ...state,
        allDogs: filteredDogs,
      };

    case GET_DOG_NAME:
      return {
        ...state,
        allDogs: action.payload,
      };

    case CREATE_DOG:
      return {
        ...state,
      };

    case GET_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case GET_DETAIL:
      console.log('tipo:');
      console.log(typeof action.payload);

      console.log('contenido:');
      console.log(action.payload);
      return {
        ...state,
        dogDetail: action.payload,
      };

    case CLEAR_DOG:
      return {
        ...state,
        dogDetail: [],
      };
    default:
      return state;
  }
}

export default rootReducer;
