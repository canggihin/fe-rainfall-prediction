import axios from 'axios';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWebsiteVisits from '../app-website-visits';


// ----------------------------------------------------------------------


export default function AppView() {

  const [dataTemp, setDataTemp] = useState([]);
  const [dataHumd, setDataHumd] = useState([]);
  const [dataPress, setDataPress] = useState([]);
  const [formattedTime, setFormattedTime] = useState([]);

  useEffect(() => {
    handleFetchDataAvg();
    const websocket = new WebSocket(`${BaseURLws}/ws`);
    websocket.onopen = () => {
      console.log('Websocket is open');
    };
    websocket.onmessage = (event) => {
      console.log('Websocket message: ', event.data);
      handleFetchDataAvg();
    };
    websocket.onclose = () => {
      console.log('Websocket is closed');
    };
    return () => {
      websocket.close();
    };
  }, []);
  
  const handleFetchDataAvg = async () => {
    try {
      const response = await axios.get(`${BaseURL}/reportday`);
      const temperatures = response.data.data.map(item => parseFloat(item.temperature));
      const humidities = response.data.data.map(item => parseFloat(item.humidity));
      const pressures = response.data.data.map(item => parseFloat(item.pressure));
      const formattedTimes = response.data.data.map(item => item.formattedTime);

      setDataTemp(temperatures);
      setDataHumd(humidities);
      setDataPress(pressures);
      setFormattedTime(formattedTimes);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Rainfall Dataset Overview ⛈️🌧️
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={16} md={12} lg={12}>
          <AppWebsiteVisits
            title="Average Data Atmosphere When Rainfall Per Day"
            subheader="This is the average data per day for the rainfall dataset."
            chart={{
              labels: formattedTime,
              series: [
                {
                  name: 'Air Pressure',
                  type: 'column',
                  fill: 'solid',
                  data: dataPress,
                  
                },
                {
                  name: 'Air Humidity',
                  type: 'area',
                  fill: 'gradient',
                  data: dataHumd,
                },
                {
                  name: 'Air Temperature',
                  type: 'line',
                  fill: 'solid',
                  data: dataTemp,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
