import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import questionService from '../../services/questions';
import votes from '../../shared/directives/votes';

export default angular
  .module('app.home', [uirouter, questionService])
  .config(routing)
  .controller('HomeController', HomeController).name;
