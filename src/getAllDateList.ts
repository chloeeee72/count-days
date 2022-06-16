import { dataFormatter, DurationOptionsList } from "./core";

// get sum days
export const allDateList = (options: Array<DurationOptionsList>) => {
  const { orderDates }: any = dataFormatter(options);
  return orderDates
};
