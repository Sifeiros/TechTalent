import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PERSON_REQUEST = 'FETCH_PERSON_REQUEST';
export const FETCH_PERSON_FAILURE = 'FETCH_PERSON_FAILURE';
export const FETCH_PERSON_SUCCESS = 'FETCH_PERSON_SUCCESS';

export const POST_PERSON_REQUEST = 'POST_PERSON_REQUEST';
export const POST_PERSON_FAILURE = 'POST_PERSON_FAILURE';
export const POST_PERSON_SUCCESS = 'POST_PERSON_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchPerson(id) {
  return function (dispatch) {
    dispatch(request());

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var init = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };

    return fetch(`https://techtalent.herokuapp.com/persons/${id}`, init)
      .then(response => response.json())
      .then(json => dispatch(receive(json))
      ).catch(function (error) {
        dispatch(failure(error.message));
      });
  };
}

export function update(skill_id, skill) {
  return function (dispatch, getState) {
    dispatch(postRequest());

    let newSkill = {
      name: skill_id,
      affinity: skill.affinity,
      level: skill.level,
    };

    console.log(getState());

    let newPerson = Object.assign({}, getState().person.person);

    newPerson.skills = newPerson.skills.map(function (s) {
      if (s.name == skill_id) {
        s.affinity = skill.affinity;
        s.level = skill.level;
      }
      return s;
    });

    console.log(skill_id, skill);
    console.log(newSkill, newPerson);

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var init = {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(newSkill)
    };


    return fetch(`https://techtalent.herokuapp.com/persons/${newPerson.id}`, init)
      .then(() => dispatch(postReceive(newPerson))
      ).catch(function (error) {
        dispatch(postFailure(error.message));
      });
  };
}

function request() {
  return {
    type: FETCH_PERSON_REQUEST
  };
}

function receive(person) {
  return {
    type: FETCH_PERSON_SUCCESS,
    payload: person
  };
}

function failure(error) {
  return {
    type: FETCH_PERSON_FAILURE,
    payload: error
  };
}

function postRequest() {
  return {
    type: POST_PERSON_REQUEST
  };
}

function postReceive(newPerson) {
  return {
    type: POST_PERSON_SUCCESS,
    payload: newPerson
  };
}

function postFailure(error) {
  return {
    type: POST_PERSON_FAILURE,
    payload: error
  };
}

export const actions = {
  fetchPerson,
  update
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
      isFetched: true,
      person: action.payload
    });
  },
  [POST_PERSON_REQUEST]: function (state, action) {
    return Object.assign({}, state, {
      error: null
    });
  },
  [POST_PERSON_FAILURE]: function (state, action) {
    return Object.assign({}, state, {
      error: action.payload
    });
  },
  [POST_PERSON_SUCCESS]: function (state, action) {
    return Object.assign({}, state, {
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
  isFetched: false,
  persons: null,
  error: null
};

export default function personReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
