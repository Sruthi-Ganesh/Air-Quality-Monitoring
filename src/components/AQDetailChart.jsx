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
import { Animation } from '@devexpress/dx-react-chart';

const PREFIX = 'Demo';

const classes = {
  'chart': `${PREFIX}-chart`
};

const format = () => tick => tick;

const Root = props => <Legend.Root {...props} sx={{ 'display': 'flex',
'margin': 'auto',
'flexDirection': 'row' }} />;

const Label = props => <Legend.Label sx={{ 'pt': 1,
'whiteSpace': 'nowrap' }} {...props} />;

const Item = props => <Legend.Item sx={{ 'flexDirection': 'column' }} {...props} />;

const ValueLabel = props => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}`}
    />
  );
};
ValueLabel.propTypes = {
  'text': PropTypes.string
}

const ArgumentLabel = props => {
  const { text } = props;
  const formattedText = new Date(text).getTime();
  return (
    <ArgumentAxis.Label
      {...props}
      text={`${formattedText}`}
    />
  );
};
ArgumentLabel.propTypes = {
  'text': PropTypes.string
}

const TitleText = props => <Title.Text {...props} sx={{ 'whiteSpace': 'pre' }} />;
const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    'paddingRight': '20px'
  }
}));

export const AQDetailChart = props => {
    const { 'data': chartData, selectedCity } = props;

    return (
      <Paper>
        <StyledChart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} labelComponent={ArgumentLabel}/>
          <ValueAxis
            max={500}
            labelComponent={ValueLabel}
          />

          <LineSeries
            name={`${selectedCity.key} City`}
            valueField="aqi"
            argumentField="dateTime"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Air Quality Index for City ${selectedCity.key} over period of time`}
            textComponent={TitleText}
          />
          <Animation />
        </StyledChart>
      </Paper>
    );
}
AQDetailChart.propTypes = {
  'data': PropTypes.array,
  'selectedCity': PropTypes.object
}

