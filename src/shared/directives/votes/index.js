export default function votes() {
  return {
    restrict: 'E',
    template: require('./votes.html'),
    scope: {
      onUpVote: '&',
      onDownVote: '&',
      upvotes: '=',
      downvotes: '=',
    },
  };
}
