import angular from "angular";
import uirouter from "angular-ui-router";

import routing from "./question.routes";
import QuestionController from "./question.controller";
import questionService from "../../services/questions";

export default angular
  .module("app.question", [uirouter, questionService])
  .config(routing)
  .controller("QuestionController", QuestionController).name;
