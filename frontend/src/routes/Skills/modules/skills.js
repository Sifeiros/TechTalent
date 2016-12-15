import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SKILLS_REQUEST = 'FETCH_SKILLS_REQUEST';
export const FETCH_SKILLS_FAILURE = 'FETCH_SKILLS_FAILURE';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchSkills () {
  return function (dispatch) {
    dispatch(request());

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var init = { method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default' };

    return fetch('https://techtalent.herokuapp.com/skills/stats', init)
      .then(response => response.json())
      .then(json => dispatch(receive(json))
      ).catch(function (error) {
        dispatch(failure(error.message));
      });
  };
}

function request () {
  return {
    type: FETCH_SKILLS_REQUEST
  };
}

function receive (skills) {
  return {
    type: FETCH_SKILLS_SUCCESS,
    payload: skills
  };
}

function failure (error) {
  return {
    type: FETCH_SKILLS_FAILURE,
    payload: error
  };
}

export const actions = {
  fetchSkills
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SKILLS_REQUEST]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    });
  },
  [FETCH_SKILLS_FAILURE]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload
    });
  },
  [FETCH_SKILLS_SUCCESS]: function (state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
      isFetched: true,
      skills: action.payload
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetched: true,
  isFetching: false,
  skills: [],
  error: null
};

export default function skillsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
