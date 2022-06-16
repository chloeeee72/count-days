import dayjs, { ConfigType } from "dayjs";
export declare type DurationOptionsList = {
    startDate: ConfigType;
    endDate: ConfigType;
};
/**
 * Generates a contiguous array of times (in days) based on time start and end dates
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns array of days
 */
declare function makeDateBetweenArr(startDate: string | number, endDate: string | number): string[];
/**
 * ❗❗❗ Main Function
 * According to multiple start and end time periods, merge time periods with overlapping dates, and return one or more time periods
 *
 * @param {*} arr
 * @returns return one or more time periods
 */
declare function getDateArray(arr: Array<DurationOptionsList>): any[];
declare function dataFormatter(arr: Array<DurationOptionsList>): never[] | {
    orderDates: string[];
    orderTimes: number[];
};
declare function getAllDateList(orderTimes: Array<number>): (string | number | Date | dayjs.Dayjs | null | undefined)[];
export { getDateArray, getAllDateList, dataFormatter, makeDateBetweenArr };
