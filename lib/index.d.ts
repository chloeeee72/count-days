export interface objectProp {
  startDate: string;
  endDate: string;
}

declare function sumDays (dateList: Array<objectProp>): number;

export default sumDays;