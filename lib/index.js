"use strict";

import dayjs from 'dayjs';

//根据时间开始结束日期，生成连续的时间数组（以天为单位）
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

// 快速排序
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

// 算法：根据多个起止时间段日期，凡是有日期重叠的时间段都要合并，得出一个或多个时间段
function getDateArray (arr) {
  // 根据起止日期，把时间段补全为每一天组成的时间段
  const dates = arr.map((item) =>
    makeDateBetweenArr(item.startDate, item.endDate)
  );
  // 把所有时间段的每一天push到一个数组里
  const allDates = [];
  dates.forEach((item) => allDates.push(...item));
  // 把数组去重，日期相同的天数去重
  if (allDates.length === 0) {
    return [];
  }
  const onlyDates = Array.from(new Set(allDates));
  // 每天转化为时间戳，进行快速排序，时间早的放前面
  const times = onlyDates.map((item) => new Date(item).getTime());
  const orderTimes = hurryShift(times);
  // 算法核心：根据相邻日期的时间戳差值是否大于一天的毫秒数判断日期是否连续，不连续则为新的时间段的起止日期
  // 把起止日期push到一个数组里，数组长度必为偶数
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
  // 把结果数组根据每2个的长度截断为新的数组，第一个值为时间段的开始日期，第二个为结束日期
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

// get days
const sumData = (res) => {
  let data = getDateArray(res)
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    count += dayjs(data[i][1]).diff(dayjs(data[i][0]), 'days');
  }
  return count;
};

export default sumData();

