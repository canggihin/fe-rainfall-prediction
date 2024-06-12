import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/datarainfall/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Data Table </title>
      </Helmet>

      <UserView />
    </>
  );
}
