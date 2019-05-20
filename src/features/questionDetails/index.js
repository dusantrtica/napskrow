import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './questionDetails.routes';
import QuestionDetailsController from './questionDetails.controller';
import questionService from '../../services/questions';

export default angular
  .module('app.question', [uirouter, questionService])
  .config(routing)
  .controller('QuestionDetailsController', QuestionDetailsController).name;
