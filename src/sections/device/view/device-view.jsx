import React from 'react';

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

export default function DeviceView() {
    return (
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
                        <ListItemText primary="Enter the address" secondary="http://172.9.0.0" />
                    </ListItem>
                </Grid>
            </Grid>
            <Box
                component="img"
                sx={{
                    width: 0.9,
                    maxHeight: 300,
                    my: 4, // Margin vertical
                    display: 'block', // Ensures the image does not inline with text
                    mx: 'auto' // Centers the image horizontally
                }}
                src="/assets/connecting1.svg"
                alt="Connecting to Wi-Fi"
            />
        </Container>
    );
}
