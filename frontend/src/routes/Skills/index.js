import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'skills',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Skills = require('./containers/SkillsContainer').default;
      const skillsReducer = require('./modules/skills').default;
      injectReducer(store, { key: 'skills', reducer: skillsReducer });
      cb(null, Skills);
    }, 'skills');
  }
});

