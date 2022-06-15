export interface objectProp {
  startDate: string;
  endDate: string;
}

declare function sumDate (dateList: Array<objectProp>): number;

export default sumDate;