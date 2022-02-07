import PropTypes from 'prop-types';
import React from 'react'

import ReactSpeedometer from 'react-d3-speedometer'
import { MAXIMUM_AIR_QUALITY_VALUE, MINIMUM_AIR_QUALITY_VALUE, AIR_QUALITY_VALUES } from '../constants/AirQualityConstant'

import '../css/AirQualityMeter.css';

export const AirQualityMeter = ({ selectedCity, className }) => {
    const currentValueText = `Current Air Quality Index for ${selectedCity.key} : ${selectedCity.aqi}`;
    return <div className={`air-quality-speedometer ${className}`}>
        <ReactSpeedometer
            maxValue={MAXIMUM_AIR_QUALITY_VALUE}
            minValue={MINIMUM_AIR_QUALITY_VALUE}
            value={selectedCity.aqi}
            currentValueText={currentValueText}
            startColor="green"
            endColor="red"
            customSegmentStops={[0, 50, 100, 200, 300, 400, 500]}
            customSegmentLabels={AIR_QUALITY_VALUES.map(value => {
                return {
                    'color': value.color,
                    'text': value.shortTitle,
                    'position': 'OUTSIDE'
                }
            })}
        />
    </div>;
}

AirQualityMeter.propTypes = {
    'selectedCity': PropTypes.object,
    'className': PropTypes.string
}

