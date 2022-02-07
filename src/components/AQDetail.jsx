import PropTypes from 'prop-types';
import React from 'react'
import { AirQualityMeter } from './AirQualityMeter'
import { AQDetailChart } from './AQDetailChart';
import { AQSearchCity } from './AQSearchCity';

import '../css/AQDetail.css';

export const AirQualityDetail = ({ selectedCityKey, setSelectedCity, latestAirQualityData, airQualityData, className }) => {
    const selectedCityObjectLatestData = latestAirQualityData.find(latestData => latestData.key === selectedCityKey);
    const selectedCityObjectWholeData = airQualityData.get(selectedCityKey);
    return <div className={className}>
        <AQSearchCity selectedCity={selectedCityKey} setSelectedCity={setSelectedCity} cityList={Array.from(airQualityData.keys())}></AQSearchCity>
        {selectedCityKey && selectedCityObjectLatestData && <AirQualityMeter selectedCity={selectedCityObjectLatestData}
            className="air-quality-home-page-speedometer">,
        </AirQualityMeter>}
        {selectedCityKey && selectedCityObjectLatestData && <AQDetailChart data={selectedCityObjectWholeData} selectedCity={selectedCityObjectLatestData}></AQDetailChart>}
    </div>;
}

AirQualityDetail.propTypes = {
    'selectedCityKey': PropTypes.string,
    'className': PropTypes.string,
    'latestAirQualityData': PropTypes.array,
    'airQualityData': PropTypes.object,
    'setSelectedCity': PropTypes.func.isRequired
}
