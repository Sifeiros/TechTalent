import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PERSON_REQUEST = 'FETCH_PERSON_REQUEST';
export const FETCH_PERSON_FAILURE = 'FETCH_PERSON_FAILURE';
export const FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchPerson (id) {
  return function (dispatch) {
    dispatch(request());

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var init = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default' };

    return fetch(`https://techtalent.herokuapp.com/persons/${id}`, init)
      .then(response => response.json())
      .then(json => dispatch(receive(json))
      ).catch(function (error) {
        dispatch(failure(error.message));
      });
  };
}

function request () {
  return {
    type: FETCH_PERSON_REQUEST
  };
}

function receive (person) {
  return {
    type: FETCH_PERSON_SUCCESS,
    payload: person
  };
}

function failure (error) {
  return {
    type: FETCH_PERSON_FAILURE,
    payload: error
  };
}

export const actions = {
  fetchPerson
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_PERSON_REQUEST]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    });
  },
  [FETCH_PERSON_FAILURE]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload
    });
  },
  [FETCH_PERSON_SUCCESS]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
      person: action.payload
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  persons: null,
  error: null
};

export default function personReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
