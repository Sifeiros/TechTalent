import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'persons',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Persons = require('./containers/PersonsContainer').default;
      const personsReducer = require('./modules/persons').default;
      const skillsReducer = require('../Skills/modules/skills').default;
      injectReducer(store, { key: 'persons', reducer: personsReducer });
      injectReducer(store, { key: 'skills', reducer: skillsReducer });
      cb(null, Persons);
    }, 'persons');
  }
});

