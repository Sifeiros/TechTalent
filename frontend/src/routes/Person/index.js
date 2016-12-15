import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'persons/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Person = require('./containers/PersonContainer').default;
      const reducer = require('./modules/person').default;
      injectReducer(store, {key: 'person', reducer});
      cb(null, Person);
    }, 'person');
  }
});


