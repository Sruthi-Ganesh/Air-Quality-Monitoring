import React, { useEffect } from 'react'

import { store, alignDataCityWise } from './redux/store';
import {AirQualityHomePage} from './components/AirQualityHomePage';

import { WEBSOCKET_URL } from './constants/AirQualityConstant';

function App() {

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
        console.log('web socket is open')
    };
    ws.onmessage = lastMessage => {
        try {
            if (lastMessage !== null) {
                alignDataCityWise(JSON.parse(lastMessage.data), store.getState());
            }
        } catch (err) {
            console.log(err);
        }
    };
    return () => ws.close();
}, []);

  return (
    <AirQualityHomePage></AirQualityHomePage>
  );
}

export default App;
