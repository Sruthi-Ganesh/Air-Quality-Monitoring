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
