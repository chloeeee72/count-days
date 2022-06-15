"use strict";
import dayjs from "dayjs";
import { getDateArray, DurationOptionsList } from "./core";

// get sum days
function sumDate(options: Array<DurationOptionsList>) {
  let data = getDateArray(options)
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    count += dayjs(data[i][1]).diff(dayjs(data[i][0]), 'days');
  }
  return count;
};

export { sumDate }