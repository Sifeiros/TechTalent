import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PERSONS_REQUEST = 'FETCH_PERSONS_REQUEST';
export const FETCH_PERSONS_FAILURE = 'FETCH_PERSONS_FAILURE';
export const FETCH_PERSONS_SUCCESS = 'FETCH_PERSONS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchPersons () {
  return function (dispatch) {
    dispatch(request());

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var init = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default' };

    return fetch('https://techtalent.herokuapp.com/persons', init)
      .then(response => response.json())
      .then(json => dispatch(receive(json.persons))
      ).catch(function (error) {
        dispatch(failure(error.message));
      });
  };
}

function request () {
  return {
    type: FETCH_PERSONS_REQUEST
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
  fetchPersons
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
      persons: action.payload
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  persons: [],
  error: null
};

export default function personsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
