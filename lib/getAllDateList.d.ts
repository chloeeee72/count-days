export interface objectProp {
  startDate: string;
  endDate: string;
}

declare function allDateList (dateList: Array<objectProp>): Array<string>;

export default allDateList;