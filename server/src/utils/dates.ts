// NOTE: with the below function we can generate a date array for the maxium period as required
export const generateWeekDateArray = (startDate: Date, stopDate: Date): Date[] => {
  const dateArray = [];
  let currentDate = startDate;
  let count = 0;
  while (currentDate <= stopDate && count < 5) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    count += 1;
  }
  return dateArray;
};
