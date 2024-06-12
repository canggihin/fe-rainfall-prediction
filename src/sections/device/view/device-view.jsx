import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function DeviceView() {
    const [seconds, setSeconds] = useState(30);  // State to hold the countdown seconds

    useEffect(() => {
        // Only set up the timer if seconds is greater than 0
        if (seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);  // Decrement seconds after 1 second
            }, 1000);

            // Return a function to clear the timeout if the component unmounts or the effect re-runs
            return () => clearTimeout(timer);
        }
        return () => {};
    }, [seconds]);  

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4">Device Online Status</Typography>
            </Stack>
            
            <Box
                sx={{
                    py: 12,
                    maxWidth: 580,
                    mx: 'auto',
                    display: 'flex',
                    minHeight: '10vh',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
                >
                {seconds > 0 ? (
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Finding Connection In {seconds} seconds...
                    </Typography>
                ) : (
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Device Not Connected....
                    </Typography>
                )}
                
                <Typography sx={{ color: 'text.secondary' }}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                    sure to check your spelling.
                </Typography>
                <Box
                    alignItems="center"
                    component="img"
                    src="/assets/connecting.svg"
                    sx={{
                    mx: 'auto',
                    height: 260,
                    my: { xs: 5, sm: 10 },
                    }}
                    />
            </Box>
            
        </Container>
    );
}
