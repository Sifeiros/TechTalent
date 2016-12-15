import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PERSONS_REQUEST = 'FETCH_PERSONS_REQUEST';
export const FETCH_PERSONS_FAILURE = 'FETCH_PERSONS_FAILURE';
export const FETCH_PERSONS_SUCCESS = 'FETCH_PERSONS_SUCCESS';
export const FETCH_PERSONS_UPDATE_PARAMS = 'FETCH_PERSONS_UPDATE_PARAMS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchPersons () {
  return function (dispatch, getState) {
    dispatch(request());

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var init = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default' };

    var url = new URL('https://techtalent.herokuapp.com/persons');
    var params = getState().persons.params;
    console.log(getState());
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return fetch(url, init)
      .then(response => response.json())
      .then(json => dispatch(receive(json))
      ).catch(function (error) {
        dispatch(failure(error.message));
      });
  };
}
export function setSearchParams (params) {
  return function (dispatch, getState) {
    dispatch(searchParams(params));
    fetchPersons()(dispatch, getState);
  };
}

function request () {
  return {
    type: FETCH_PERSONS_REQUEST
  };
}

function searchParams (params) {
  return {
    type: FETCH_PERSONS_UPDATE_PARAMS,
    payload: params
  };
}

function receive (persons) {
  return {
    type: FETCH_PERSONS_SUCCESS,
    payload: persons
  };
}

function failure (error) {
  return {
    type: FETCH_PERSONS_FAILURE,
    payload: error
  };
}

export const actions = {
  fetchPersons,
  setSearchParams
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_PERSONS_REQUEST]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    });
  },
  [FETCH_PERSONS_FAILURE]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload
    });
  },
  [FETCH_PERSONS_SUCCESS]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
      isFetched: true,
      persons: action.payload
    });
  },
  [FETCH_PERSONS_UPDATE_PARAMS]: function (state, action) {
    return Object.assign({}, state, {
      params: Object.assign({}, state.params, action.payload)
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  isFetched: false,
  persons: [],
  error: null,
  params: {}
};

export default function personsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
