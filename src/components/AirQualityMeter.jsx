import PropTypes from 'prop-types';
import React from 'react'

import ReactSpeedometer from 'react-d3-speedometer'
import { MAXIMUM_AIR_QUALITY_VALUE, MINIMUM_AIR_QUALITY_VALUE } from '../constants/AirQualityConstant'

import '../css/AirQualityMeter.css';

export const AirQualityMeter = ({selectedCity, className }) => {
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
            // customSegmentLabels={[
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Good'

            //     },
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Satisfactory'
            //     },
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Moderate'
            //     },
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Poor'
            //     },
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Very Poor'
            //     },
            //     {
            //         'color': '#555',
            //         'position': 'OUTSIDE',
            //         'text': 'Severe'
            //     }
            // ]}
        />
    </div>;
}

AirQualityMeter.propTypes = {
    'selectedCity': PropTypes.object,
    'className': PropTypes.string
}

