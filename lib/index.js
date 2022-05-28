"use strict";
var dayjs = require('dayjs')

/**
 * Generates a contiguous array of times (in days) based on time start and end dates
 * 
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns array of days
 */
function makeDateBetweenArr (startDate, endDate) {
  let dates = [];
  const theDate = new Date(startDate);
  while (theDate < new Date(endDate)) {
    dates = [...dates, dayjs(new Date(theDate)).format('YYYY-MM-DD')];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, dayjs(new Date(theDate)).format('YYYY-MM-DD')];
  return dates;
}

// Quick sort
function hurryShift (arr) {
  if (arr.length === 1 || arr.length === 0) {
    return arr;
  }
  let fix = arr[0];
  let left = [];
  let right = [];
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
 * According to multiple start and end time periods, merge time periods with overlapping dates, and return one or more time periods
 * 
 * @param {*} arr 
 * @returns return one or more time periods
 */
function getDateArray (arr) {
  // completion date
  const dates = arr.map((item) =>
    makeDateBetweenArr(item.startDate, item.endDate)
  );
  // push to a new array
  const allDates = [];
  dates.forEach((item) => allDates.push(...item));
  // Delete values ​​with the same date
  if (allDates.length === 0) {
    return [];
  }
  const onlyDates = Array.from(new Set(allDates));
  // To timestamp，Quick sort, put earlier time first
  const times = onlyDates.map((item) => new Date(item).getTime());
  const orderTimes = hurryShift(times);
  // Determine if time is continuous or not，return a new array
  const temp = [];
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
  // Truncate the resulting array to a new array of length 2, 
  // the first value is the start date 
  // and the second value is the end date
  let result = [];
  if (temp.length > 0) {
    let index = 0;
    let resIndex = 0;
    result = new Array(Math.ceil(temp.length / 2));
    while (index < temp.length) {
      result[resIndex++] = temp.slice(index, (index += 2));
    }
  }
  return result;
}

// get sum days
function sumDays (res) {
  let data = getDateArray(res)
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    count += dayjs(data[i][1]).diff(dayjs(data[i][0]), 'days');
  }
  return count;
};

module.exports = sumDays;
