import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'persons',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Persons = require('./containers/PersonsContainer').default;
      const reducer = require('./modules/persons').default;
      injectReducer(store, {key: 'persons', reducer});
      cb(null, Persons);
    }, 'persons');
  }
});


