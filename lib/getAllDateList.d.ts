export interface objectProp {
  startDate: string;
  endDate: string;
}

declare function allDateList (dateList: Array<objectProp>): number;

export default allDateList;