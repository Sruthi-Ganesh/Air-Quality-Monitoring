# Air-Quality-Monitoring
- Single Page App to monitor live air quality index. 
- Three tabs are visible on home page
    1. City Air Quality Indexes Table - Displays the table containing air quality indexes for overall cities in India
    2. Detailed information per city - Shows a speedometer toggling with current aqi and shows the chart containing the aqi of the city over a period of time
    3. Comparison of various cities - Compares different cities in chart over a period of time
- This project took 2 days to implement with React, Redux, MaterialUI and Websockets.
- Using 'ws://city-ws.herokuapp.com/' to retrieve live air quality indexes
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important to keep the browser active for few seconds to see the chart and table automatically updating.

## To run the project in development server

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Next step of improvements
Move websocket to backend and use database to store historical data (Example: nodeJs) (or) persist the redux states in local storage using redux-persist
