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
var sumDays = require('count-days')
// or
import sumDays from 'count-days'

const data = [
  { startDate: '2022-05-12', endDate: '2022-05-25' }, // 13 days
  { startDate: '2022-05-15', endDate: '2022-06-08' }, // 24 days
  { startDate: '2022-06-15', endDate: '2022-06-20' }, // 05 days
  { startDate: '2022-06-10', endDate: '2022-06-25' }, // 05 days
]

sumDays(data) // 42 days in total
```

### Api

- Function `sumData`, accept a Array:

```js
  [
    { startDate:'', endDate:'' },
    {...},
    // more Object
  ]
```
### TODO

- allDaysList: `Array<String>`, includes all days between all startDate and endDate

- days: `Array<Number>`, count days in each object.[12,24,05,05,....]

- optimize sumDays




