import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';

import home from './features/home';
import question from './features/questionDetails';
import votes from './shared/directives/votes';
import newAnswer from './shared/directives/newAnswer';
import user from './shared/directives/user';

export default angular
  .module('app', [uirouter, home, question])
  .config(routing)
  .directive('votes', votes)
  .directive('user', user)
  .directive('newAnswer', newAnswer).name;
