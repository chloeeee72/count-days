import { dataFormatter, DurationOptionsList } from "./core";

// get sum days
function allDateList(options: Array<DurationOptionsList>) {
  const { orderDates }: Array<number> = dataFormatter(options);
  return orderDates
};

export { allDateList }