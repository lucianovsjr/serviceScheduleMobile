export const convertWeek = (week) =>
  week
    .split('')
    .reduce(
      (accumulator, currentValue) => [...accumulator, !!Number(currentValue)],
      []
    );
