import { createStore } from 'redux';
import {alignDataByKey} from '../utils/DataHelper';

// eslint-disable-next-line default-param-last
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'addAirQualityValues':
            return action.payload;
        default:
            return state;
      }
};

export const store = createStore(reducer);

export const alignDataCityWise = messyPayload => {
    const payload = alignDataByKey(messyPayload, store.getState());
    store.dispatch({
        payload,
        'type': 'addAirQualityValues'
      });
}


