import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DETAIL = 'GET_DETAIL';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPS = 'GET_TEMPS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_BD = 'ORDER_BY_CREATED';
export const GET_DOG_NAME = 'GET_DOG_NAME';
export const ORDER_BY_TEMPS = 'ORDER_BY_TEMPS';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const CLEAR_DOG = 'CLEAR_DOG';
export const POST_DOG = 'POST_DOG';

export function getDogs() {
  return async function (dispatch) {
    try {
      var json = await axios.get('/dogs');
    } catch (e) {
      return e;
    }

    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    });
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: ORDER_BY_BD,
    payload,
  };
}

export function searchDog(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: GET_DOG_NAME,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
      alert('Dog not found');
    }
  };
}

export function orderByTemps(payload) {
  return {
    type: ORDER_BY_TEMPS,
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var resp = await axios.get('/temperaments');
    return dispatch({ type: GET_TEMPS, payload: resp.data });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post('/dogs', payload);
    return dispatch({type: POST_DOG, payload: response});
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('/dogs/' + id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert('Dog not found :(');
    }
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function clearDog() {
  return {
    type: CLEAR_DOG,
  };
}
