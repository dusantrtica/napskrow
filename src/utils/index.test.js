import { sortAnswers } from './';

describe('utils function tests', () => {
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
