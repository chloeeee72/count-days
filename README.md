# count-days 

Put a Array with multiple start times and end times, return the total number of days

![npm](https://img.shields.io/npm/v/count-days.svg) ![npm](https://img.shields.io/npm/l/count-days.svg)

## Link

npm: [click to check](https://www.npmjs.com/package/count-days)

github: [click to check](https://www.npmjs.com/package/count-days)

## How to use
### Installation

      npm i count-days

### How to use

```js
var sumDate = require('count-days')
// or
import sumDate from 'count-days'
```

- Function `sumDate`, accept a Array, return a Number of sum days:

```js
  sumDate([
    { startDate:'2022-05-12', endDate:'2022-06-08' },
    {...},
    // more Object
  ])

  // example:
  sumDate([
    { startDate: '2022-06-01', endDate: '2022-06-08' }, // 7
    { startDate: '2022-05-12', endDate: '2022-05-12' }, // 2
  ]);
  // 9
```

- Function `allDateList`, accept a Array, return Array of all date:

```js
  allDateList([
    { startDate:'2022-05-12', endDate:'2022-06-08' },
    {...},
    // more Object
  ]) 

  // example:
  allDateList([
    { startDate: '2022-06-01', endDate: '2022-06-08' }, // 7
    { startDate: '2022-05-12', endDate: '2022-05-12' }, // 2
  ]);
  // ["2022-05-12", "2022-06-01", "2022-06-02", "2022-06-03", "2022-06-04", "2022-06-05", "2022-06-06", "2022-06-07", "2022-06-08"]
```

### Api

#### params 

|  params   | type  | default | description |
|  ----  | ----  |  ---  | ---  |
| options  | DurationOptionsList | - | - | 

#### DurationOptionsList

|  params   | type  | default | description |
|  ----  | ----  |  ---  | ---  |
| startTime  | string / Date / Dayjs / null /undefined | - | - | 
| endTime    | string / Date / Dayjs / null /undefined | - | - | 

#### Function `sumDate`

Accept a `Array`, type is DurationOptionsList, return a `Number` of sum days

#### Function `allDateList`

Accept a `Array`, type is DurationOptionsList, return a `Array` of all date sting

### TODO & UPDATE

- [√] **22/06/15 update**: allDateList: `Array<String>`, includes all days in the data，optimize sumDate
- [√] **22/06/16 update least version 0.2.7**: use Rollup to packing
- objectSumDate: `Array<Number>`, count days in each object.like:[12,24,05,05,....]
