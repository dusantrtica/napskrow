import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';

import home from './features/home';
import question from './features/question';

export default angular.module('app', [uirouter, home, question]).config(routing)
  .name;
