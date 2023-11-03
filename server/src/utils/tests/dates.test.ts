import { createDateFromISODate, generateWeekDateArray } from '../dates';

describe('Dates utils', () => {
  it('should generate a date array for the maximum period', () => {
    const startDate = new Date('2021-09-01');
    const stopDate = new Date('2021-09-30');
    const dateArray = generateWeekDateArray(startDate, stopDate);
    expect(dateArray.length).toBe(7);
  });
  it('should verify that the correct date is created from an ISO date string', () => {
    const date = createDateFromISODate('2021-09-01');
    expect(date).toEqual(new Date('2021-09-01'));
  });
});
