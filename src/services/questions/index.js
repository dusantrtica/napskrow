import angular from "angular";
import * as R from "ramda";
import { sortAnswers } from "../../utils";

const indexAndSort = R.compose(
  R.map(sortAnswers),
  R.groupBy(R.prop("Question-Id"))
);

class QuestionService {
  /* Questions have no timestamp in, so I assumed ID are in increasing order meaning that
    the most recent question will have the greatest Id */
  getQuestions() {
    return fetch(" https://api.myjson.com/bins/dck5b")
      .then(R.invoker(0, "json"))
      .then(R.prop("feed_questions"))
      .then(R.sortWith([R.descend(R.prop("Id"))]));
  }

  /* answers are indexed per question id */
  getAnswers() {
    return fetch("https://api.myjson.com/bins/hildr")
      .then(R.invoker(0, "json"))
      .then(
        R.compose(
          indexAndSort,
          R.prop("feed_answers")
        )
      );
  }
}

export default angular
  .module("services.questionService", [])
  .service("questionService", QuestionService).name;
