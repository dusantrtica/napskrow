import angular from "angular";
import * as R from "ramda";

const indexAndSort = R.compose(
  R.map(R.sortBy(R.prop("created_at"))),
  R.groupBy(R.prop("Question-Id"))
);

class QuestionService {
  getQuestions() {
    return fetch(" https://api.myjson.com/bins/dck5b")
      .then(R.invoker(0, "json"))
      .then(R.prop("feed_questions"));
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
