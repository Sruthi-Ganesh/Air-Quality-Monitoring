import React, { useEffect } from 'react'
import { AQTable } from './AQTable';
import { store } from '../redux/store';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { throttle } from 'lodash';

import '../css/AirQualityHomePage.css';
import { AirQualityDetail } from './AQDetail';
import { AQCityComparison } from './AQCityComparison';

const getUpdatedAtInfo = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffMinutes = Math.floor(diffTime / 1000);
    if (diffMinutes < 1) {
        return 'Updated just now';
    } else if (diffMinutes >= 1 && diffMinutes < 5) {
        return 'Updated few seconds ago';
    }
    return `Updated ${diffMinutes} seconds ago`;

}

const getLatestRowForCities = airQualityData => {
    const latestRowForCities = [];
    airQualityData.forEach((valueList, key) => {
        const latestRow = valueList.reduce((city1, city2) => {
            return new Date(city1.dateTime) > new Date(city2.dateTime) ? city1 : city2;
        });
        const updatedAt = getUpdatedAtInfo(new Date(latestRow.dateTime), new Date());
        latestRow.updatedAt = updatedAt;
        latestRow.key = key;
        latestRowForCities.push(latestRow);
    });
    return latestRowForCities;
};

export const AirQualityHomePage = () => {
    const [airQualityData, setAirQualityData] = React.useState(new Map());
    const [latestAirQualityData, setLatestAirQualityData] = React.useState(getLatestRowForCities(airQualityData));
    const [currentTab, setCurrentTab] = React.useState('1');
    const [selectedCity, setSelectedCity] = React.useState(null)
    let throttled = null;

    useEffect(() => {
        throttled = throttle(() => {
            const airQualityDataFromRedux = store.getState();
            const latestAirQualityDataFromRedux = getLatestRowForCities(airQualityDataFromRedux);
            setAirQualityData(airQualityDataFromRedux);
            setLatestAirQualityData(latestAirQualityDataFromRedux);
        }, 5000, {'trailing': false});
        if (selectedCity === null) {
            setSelectedCity(airQualityData.size === 0 ? null : latestAirQualityData[0].key);
        }
    }, []);

    store.subscribe(() => {
        if (!throttled) {
            return;
        }
        throttled();
    })

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const onCitySelected = cityObj => {
        setSelectedCity(cityObj.key);
        setCurrentTab('2');
    }

    return (
        <Box sx={{
            'width': '100%',
            'typography': 'body1'
        }}>
            <TabContext value={currentTab}>
                <Box sx={{
                    'borderBottom': 1,
                    'borderColor': 'divider'
                }}>
                    <TabList onChange={handleChange} aria-label="Air Quality Index">
                        <Tab label="City Air Quality Indexes Table" value="1" />
                        <Tab label="Detailed information per city" value="2" />
                        <Tab label="Comparison of various cities" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AQTable latestAirQualityData={latestAirQualityData} onSelectCity={onCitySelected}/>
                </TabPanel>
                <TabPanel value="2">
                    <AirQualityDetail className="air-quality-detail"
                        latestAirQualityData={latestAirQualityData}
                        airQualityData={airQualityData}
                        currentValue={400}
                        cityName={'Delhi'}
                        selectedCityKey={selectedCity}
                        setSelectedCity={setSelectedCity}
                        onSelectCity={onCitySelected}
                    />
                </TabPanel>
                <TabPanel value="3"><AQCityComparison airQualityData={airQualityData}></AQCityComparison></TabPanel>
            </TabContext>
        </Box>);
}
