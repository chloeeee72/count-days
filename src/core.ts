"use strict";
import dayjs, { ConfigType } from "dayjs";

export type DurationOptionsList = {
  startDate: ConfigType;
  endDate: ConfigType;
}

/**
 * Generates a contiguous array of times (in days) based on time start and end dates
 * 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns array of days
 */
function makeDateBetweenArr(startDate: ConfigType, endDate: ConfigType) {
  let dates: Array<string> = [];
  const theDate = new Date(startDate);
  while (theDate < new Date(endDate)) {
    dates = [...dates, dayjs(new Date(theDate)).format('YYYY-MM-DD')];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, dayjs(new Date(theDate)).format('YYYY-MM-DD')];
  return dates;
}

// Quick sort
function hurryShift(arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr;
  }
  let fix = arr[0];
  let left: Array<number> = [];
  let right: Array<number> = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= fix) {
      left.push(arr[i]);
    }
    if (arr[i] > fix) {
      right.push(arr[i]);
    }
  }
  return hurryShift(left).concat([fix], hurryShift(right));
}

/**
 * ❗❗❗ Main Function
 * According to multiple start and end time periods, merge time periods with overlapping dates, and return one or more time periods
 * 
 * @param {*} arr 
 * @returns return one or more time periods
 */
function getDateArray(arr: Array<DurationOptionsList>) {
  if (arr.length === 0) {
    return [];
  }
  const { orderTimes }: any = dataFormatter(arr);
  // Determine if time is continuous or not，return a new array
  const allDatesList: Array<string | number | ConfigType> = getAllDateList(orderTimes);
  // Truncate the resulting array to a new array of length 2, 
  // the first value is the startDate 
  // and the second value is the endDate
  let result: Array<Array<string>> = [];
  if (allDatesList.length > 0) {
    let index = 0;
    let resIndex = 0;
    result = new Array(Math.ceil(allDatesList.length / 2));
    while (index < allDatesList.length) {
      result[resIndex++] = allDatesList.slice(index, (index += 2));
    }
  }
  return result;
}

function dataFormatter(arr: Array<DurationOptionsList>) {
  // completion date
  const dates = arr.map((item) =>
    makeDateBetweenArr(item.startDate, item.endDate)
  );
  // push to a new array
  const allDates: Array<string> = [];
  dates.forEach((item) => allDates.push(...item));
  // Delete values ​​with the same date
  if (allDates.length === 0) {
    return [];
  }
  const onlyDates: Array<string> = Array.from(new Set(allDates));
  // To timestamp，Quick sort, put earlier time first
  const times: Array<number> = onlyDates.map((item) => new Date(item).getTime());
  const orderTimes: Array<number> = hurryShift(times);
  const orderDates: Array<string> = orderTimes.map((item) =>
    dayjs(item).format('YYYY-MM-DD')
  );
  return { orderDates, orderTimes };
}

function getAllDateList(orderTimes: Array<number>) {
  // array of dates, change orderTimes: Array<number> to Array<string>
  // if the same day, to Array<number>
  const temp: Array<string | number | ConfigType> = [];
  if (orderTimes.length === 0) {
    return temp;
  }
  if (orderTimes.length === 1) {
    temp.push(...[orderTimes[0], orderTimes[0]]);
  } else {
    orderTimes.forEach((item, index) => {
      if (index === 0) {
        temp.push(dayjs(item).format('YYYY-MM-DD'));
      } else {
        if (item - orderTimes[index - 1] > 86400000) {
          temp.push(dayjs(orderTimes[index - 1]).format('YYYY-MM-DD'));
          temp.push(dayjs(item).format('YYYY-MM-DD'));
        }
        if (index === orderTimes.length - 1) {
          temp.push(dayjs(item).format('YYYY-MM-DD'));
        }
      }
    });
  }
  return temp;
}

export { getDateArray, getAllDateList, dataFormatter, makeDateBetweenArr }
