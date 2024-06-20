import { Helmet } from 'react-helmet-async';

import LandingPageView from 'src/sections/landingPage/landingPage';

export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title> Rainfall Prediction </title>
            </Helmet>
            <LandingPageView />
        </>
    );
}