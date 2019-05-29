import { sortAnswers, upVoteQuestion, downVoteQuestion, saveAnswer } from './';

describe('utils function tests', () => {
  describe('saveAnswer', () => {
    it('should add answer in answers object, based on proper Id', () => {
      expect(saveAnswer(1, 'new answer', { 1: [] })).toEqual({
        1: ['new answer'],
      });
    });

    it('should append new answer so that it is the latest one', () => {
      expect(saveAnswer(1, 'new answer', { 1: ['previous answer'] })).toEqual({
        1: ['new answer', 'previous answer'],
      });
    });

    it('should not mutate other objects', () => {
      expect(
        saveAnswer(1, 'new answer', {
          1: ['previous answer'],
          2: ['some other answer'],
        }),
      ).toEqual({
        1: ['new answer', 'previous answer'],
        2: ['some other answer'],
      });
    });
  });
  describe('upVoteQuestion', () => {
    it('should upvote question in array', () => {
      expect(upVoteQuestion(1, [{ Id: 1, upvotes: 0 }])).toEqual([
        { Id: 1, upvotes: 1 },
      ]);
    });

    it('should upvote question in case upvote property does not exist', () => {
      expect(upVoteQuestion(1, [{ Id: 1 }])).toEqual([{ Id: 1, upvotes: 1 }]);
    });

    it('should not mutate other array elements', () => {
      expect(
        upVoteQuestion(1, [{ Id: 1, upvotes: 0 }, { Id: 2, upvotes: 1 }]),
      ).toEqual([{ Id: 1, upvotes: 1 }, { Id: 2, upvotes: 1 }]);
    });

    it('should not break if question is not present in the questions array', () => {
      expect(upVoteQuestion(2, [{ Id: 1, upvotes: 0 }])).toEqual([
        { Id: 1, upvotes: 0 },
      ]);
    });

    it('should not update quesitons if the question with Id is not in array', () => {
      expect(
        upVoteQuestion(3, [{ Id: 1, upvotes: 0 }, { Id: 2, upvotes: 0 }]),
      ).toEqual([{ Id: 1, upvotes: 0 }, { Id: 2, upvotes: 0 }]);
    });
  });
  describe('downVoteQuestion', () => {
    it('should downvote question in array', () => {
      expect(downVoteQuestion(1, [{ Id: 1, downvotes: 0 }])).toEqual([
        { Id: 1, downvotes: 1 },
      ]);
    });

    it('should downvote question in case downvotes property does not exist', () => {
      expect(downVoteQuestion(1, [{ Id: 1 }])).toEqual([
        { Id: 1, downvotes: 1 },
      ]);
    });

    it('should not mutate other array elements', () => {
      expect(
        downVoteQuestion(1, [{ Id: 1, downvotes: 0 }, { Id: 2, downvotes: 1 }]),
      ).toEqual([{ Id: 1, downvotes: 1 }, { Id: 2, downvotes: 1 }]);
    });

    it('should not break if question is not present in the questions array', () => {
      expect(downVoteQuestion(2, [{ Id: 1, downvotes: 0 }])).toEqual([
        { Id: 1, downvotes: 0 },
      ]);
    });

    it('should not update quesitons if the question with Id is not in array', () => {
      expect(
        downVoteQuestion(3, [{ Id: 1, downvotes: 0 }, { Id: 2, downvotes: 0 }]),
      ).toEqual([{ Id: 1, downvotes: 0 }, { Id: 2, downvotes: 0 }]);
    });
  });
  describe('sortAnswers', () => {
    it('should work properly empty array', () => {
      expect(sortAnswers([])).toEqual([]);
    });

    it('should work properly on one element array', () => {
      expect(sortAnswers([1])).toEqual([1]);
    });

    it('should sort arrays properly based on created_at', () => {
      const answers = [
        {
          created_at: '20/May/19 12:33',
        },
        {
          created_at: '19/May/19 12:33',
        },
        {
          created_at: '21/May/19 12:33',
        },
      ];

      expect(sortAnswers(answers)).toEqual([
        {
          created_at: '21/May/19 12:33',
        },
        {
          created_at: '20/May/19 12:33',
        },
        {
          created_at: '19/May/19 12:33',
        },
      ]);
    });
  });
});
