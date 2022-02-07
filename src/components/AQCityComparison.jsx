import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const PREFIX = 'AirQuality';

const classes = {
  'title': `${PREFIX}-title`,
  'chart': `${PREFIX}-chart`
};

const Line = props => <LineSeries.Path
  {...props}
  path={line()
    .x(({ arg }) => arg)
    .y(({ val }) => val)
    .curve(curveCatmullRom)}
/>;
const StyledDiv = styled('div')(() => ({
  [`&.${classes.title}`]: {
    'textAlign': 'center',
    'width': '100%',
    'marginBottom': '10px'
  }
}));

const Text = ({ text }) => {
  const [mainText, subText] = text.split('\\n');
  return (
    <StyledDiv className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </StyledDiv>
  );
};
Text.propTypes = {
  'text': PropTypes.string
}

const Root = props => <Legend.Root {...props} sx={{
  'display': 'flex',
  'margin': 'auto',
  'flexDirection': 'row'
}} />;

const Label = props => <Legend.Label {...props} sx={{
  'mb': 1,
  'whiteSpace': 'nowrap'
}} />;

const Item = props => <Legend.Item {...props} sx={{ 'flexDirection': 'column-reverse' }} />;

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    'paddingRight': '30px'
  }
}));

const constructComparisonChartData = airQualityData => {
  const dateComparisonChart = new Map();
  const cities = new Set();
  airQualityData.forEach((valueList, key) => {
    cities.add(key);
    valueList.forEach(value => {
      const keyToAdd = new Date(value.dateTime).getTime()
      if (!dateComparisonChart.has(keyToAdd)) {
        dateComparisonChart.set(keyToAdd, { 'dateTime': keyToAdd });
      }
      const dateComparisonObj = dateComparisonChart.get(keyToAdd);
      if (value && key && dateComparisonObj.key !== key) {
        dateComparisonObj[key] = value.aqi;
      }
    });
  });
  return {
    'dateComparisonChart': Array.from(dateComparisonChart.values()),
    'citiesArray': Array.from(cities)
  };
}

export const AQCityComparison = props => {
  const { dateComparisonChart, citiesArray } = constructComparisonChartData(props.airQualityData);
  return (
    <Paper>
      <StyledChart
        data={dateComparisonChart}
        className={classes.chart}
      >
        <ArgumentScale factory={scalePoint} />
        <ArgumentAxis />
        <ValueAxis />
        {citiesArray.map(city => <LineSeries
          key={city}
          name={city}
          valueField={city}
          argumentField="dateTime"
          seriesComponent={Line}
        />)}
        <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
        <Title
          text="Comparison of Air Quality Index in Multiple Cities"
          textComponent={Text}
        />
        <Animation />
      </StyledChart>
    </Paper>
  );
}
AQCityComparison.propTypes = {
  'data': PropTypes.object,
  'airQualityData': PropTypes.object
}
