import { forEach, round } from 'lodash';

export const alignDataByKey = (dataToBeInserted, data) => {
    const modifiedData = new Map();
    if (data instanceof Map) {
        data.forEach((value, key) => modifiedData.set(key, value));
    }
    forEach(dataToBeInserted, aqiForCityObj => {
        if (!modifiedData.has(aqiForCityObj.city)) {
            modifiedData.set(aqiForCityObj.city, []);
        }
        modifiedData.get(aqiForCityObj.city).push({
            'aqi': parseFloat(round(aqiForCityObj.aqi, 2).toFixed(2)),
            'dateTime': new Date().toISOString(),
            'key': aqiForCityObj.city
        })
    });
    return modifiedData;
}
