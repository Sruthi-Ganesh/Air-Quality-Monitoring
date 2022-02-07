import PropTypes from 'prop-types';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import '../css/AQSearchCity.css';

export const AQSearchCity = props => {
    const { cityList, setSelectedCity, selectedCity } = props;
    return <Autocomplete
        className="air-quality-search"
        value={selectedCity}
        onChange={(event, newValue) => {
            if (typeof newValue === 'string' && cityList.includes(newValue)) {
                setSelectedCity(newValue);
            }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={cityList}
        getOptionLabel={option => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            // Regular option
            return option;
        }}
        renderOption={(renderProps, option) => <li {...renderProps}>{option}</li>}
        sx={{ 'width': 300 }}
        freeSolo
        renderInput={params => <TextField {...params} label="Search city" />
        }
    />;
}


AQSearchCity.propTypes = {
    'cityList': PropTypes.array,
    'setSelectedCity': PropTypes.func,
    'selectedCity': PropTypes.string
}
