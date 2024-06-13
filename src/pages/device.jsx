import { Helmet } from 'react-helmet-async';

import { DeviceView } from 'src/sections/device/view';

// ----------------------------------------------------------------------

export default function DevicePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Data Table </title>
      </Helmet>

      <DeviceView />
    </>
  );
}