import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PermScanWifiIcon from '@mui/icons-material/PermScanWifi';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

import AppWidgetSummary from '../app-widget-summary';
import { BaseURLws } from '../../../config/configVars';

export default function DeviceView() {

    const [connected, setConnected] = useState(() => {
        const savedConnected = localStorage.getItem('connected');
        return savedConnected === 'true';
    });
    const [totalSensor, setTotalSensor] = useState(() => {
        const savedTotalSensor = localStorage.getItem('totalSensor');
        return parseInt(savedTotalSensor, 10) || 0;
    });
    const [cpuStatus, setCpuStatus] = useState(() => {
        const savedCpuStatus = localStorage.getItem('cpuStatus');
        return parseInt(savedCpuStatus, 10) || 0;
    });
    const [ramStatus, setRamStatus] = useState(() => {
        const savedRamStatus = localStorage.getItem('ramStatus');
        return parseInt(savedRamStatus, 10) || 0;
    });
    const [batteryLevel, setBatteryLevel] = useState(() => {
        const savedBatteryLevel = localStorage.getItem('batteryLevel');
        return parseInt(savedBatteryLevel, 10) || 0;
    });

    useEffect(() => {

        const websocket = new WebSocket(`${BaseURLws}/ws/system`);
        websocket.onopen = () => {
            console.log('Websocket is open');
        };
        websocket.onmessage = (event) => {
            const events = event.data;
            const jsonevents = JSON.parse(events);
            if (jsonevents.battery_level !== 0) {
                setConnected(true);
                localStorage.setItem('connected', 'true');
                localStorage.setItem('batteryLevel', jsonevents.battery_level);
                setBatteryLevel(jsonevents.battery_level, 10);
            }
            if (jsonevents.cpu_consume !== "" && jsonevents.ram_consume !== "" && jsonevents.battery_level !== 0) {
                setConnected(true);
                localStorage.setItem('connected', 'true');
                localStorage.setItem('cpuStatus', jsonevents.cpu_consume);
                localStorage.setItem('ramStatus', jsonevents.ram_consume);
                localStorage.setItem('totalSensor', jsonevents.total_sensor);
                setCpuStatus(parseInt(jsonevents.cpu_consume, 10));
                setRamStatus(parseInt(jsonevents.ram_consume, 10));
                setTotalSensor(jsonevents.total_sensor);
            } else {
                localStorage.removeItem('cpuStatus');
                localStorage.removeItem('ramStatus');
                localStorage.removeItem('totalSensor');
                localStorage.removeItem('batteryLevel');
                localStorage.removeItem('connected');
                setConnected(false);
                localStorage.setItem('connected', 'false');
            }
        };
        websocket.onclose = () => {
            localStorage.removeItem('cpuStatus');
            localStorage.removeItem('ramStatus');
            localStorage.removeItem('totalSensor');
            localStorage.removeItem('batteryLevel');
            localStorage.removeItem('connected');
            setConnected(false);
            localStorage.setItem('connected', 'false');
            console.log('Websocket is closed');
        };
        return () => {
            websocket.close();
        };
    }, []);

    return (
        !connected ?
        (
            <Container>
                <Typography variant="h3" align="center" mb={3}>
                    Device Does’t Connect To WIFI ....
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 4 }} align="center">
                    please connect to wifi with the following steps ..
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WifiIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Open Mobile Apps or Computers" secondary="Find WIFI Setting" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PermScanWifiIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Enter the wifi name or SSID, and password" secondary="in this step doing 2 times" />
                        </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ConnectWithoutContactIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Connect the wifi" secondary="on the cell phone to the ESP32Kit" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CheckCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="The device is successfully connected" secondary="in this step doing 2 times" />
                        </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LanguageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Open a web browser" secondary="(safari, google chrome, mozilla)" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <OpenInBrowserIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Enter the address" secondary="http://192.168.4.1" />
                        </ListItem>
                    </Grid>
                </Grid>
                <Box
                    component="img"
                    sx={{
                        width: 0.9,
                        maxHeight: 300,
                        my: 4,
                        display: 'block',
                        mx: 'auto' 
                    }}
                    src="/assets/connecting1.svg"
                    alt="Connecting to Wi-Fi"
                />
             </Container>
        )
        :
        (
            <Container maxWidth="xl">
                <Typography variant="h3" mb={3}>
                    Device Connect To WIFI
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Sensor Active"
                            total={totalSensor}
                            color="success"
                            satuan="Sensor"
                            icon={<img alt="icon" src="/assets/icons/glass/sensors_active.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="CPU Consume"
                            total={cpuStatus}
                            color="success"
                            satuan="ms"
                            icon={<img alt="icon" src="/assets/icons/glass/cpu_status.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="RAM Consme"
                            total={ramStatus}
                            color="success"
                            satuan="ms"
                            icon={<img alt="icon" src="/assets/icons/glass/ram_consume.png" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Battery Level"
                            total={batteryLevel}
                            color="success"
                            icon={<img alt="icon" src="/assets/icons/glass/bettery.png" />}
                            satuan="%"
                        />
                    </Grid>
                </Grid>
             </Container>
        )
    );
}
