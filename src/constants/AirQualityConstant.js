export const MAXIMUM_AIR_QUALITY_VALUE = 500;
export const MINIMUM_AIR_QUALITY_VALUE = 0;
export const WEBSOCKET_URL = 'ws://city-ws.herokuapp.com/';
export const AQTABLEHEADER = [
  {
    'id': 'key',
    'numeric': false,
    'header': true,
    'disablePadding': true,
    'label': 'Cities'
  },
  {
    'id': 'aqi',
    'numeric': true,
    'header': false,
    'disablePadding': false,
    'label': 'Current Air Quality Index'
  },
  {
    'id': 'updatedAt',
    'numeric': false,
    'header': false,
    'disablePadding': false,
    'label': 'Updated at'
  }
];
export const DEFAULT_ROW_PAGE_OPTIONS = [5, 10, 25];
export const [, DEFAULT_ROWS_PER_AQ_TABLE] = DEFAULT_ROW_PAGE_OPTIONS;
export const DEFAULT_COLUMN_TO_SORT = AQTABLEHEADER[1].id;
export const AIR_QUALITY_VALUES = [
  {
    'start': 0,
    'end': 50,
    'title': 'Good',
    'shortTitle': 'Good',
    'color': '#008000',
    'key': 'good'
  }, {
    'start': 51,
    'end': 100,
    'title': 'Satisfactory',
    'shortTitle': 'Ok',
    'color': '#1C8D00',
    'key': 'satisfactory'
  }, {
    'start': 101,
    'end': 200,
    'title': 'Moderate',
    'shortTitle': 'Avg',
    'color': '#8FB300',
    'key': 'moderate'
  }, {
    'start': 201,
    'end': 300,
    'title': 'Poor',
    'shortTitle': 'Poor',
    'color': '#CCA300',
    'key': 'poor'
  }, {
    'start': 301,
    'end': 400,
    'title': 'Very Poor',
    'shortTitle': 'VPoor',
    'color': '#E65C00',
    'key': 'very-poor'
  }, {
    'start': 401,
    'end': 500,
    'title': 'Severe',
    'shortTitle': 'Severe',
    'color': '#FF0000',
    'key': 'severe'
  }
]
