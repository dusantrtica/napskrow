import moment from "moment";
import * as R from "ramda";

const answerCreatedDateFormat = "dd/MMM/yy HH:mm";

const momentFromDate = R.curry((format, date) => moment(date, format));

export const sortAnswers = R.sortBy(
  R.compose(
    momentFromDate(answerCreatedDateFormat),
    R.prop("created_at")
  )
);
