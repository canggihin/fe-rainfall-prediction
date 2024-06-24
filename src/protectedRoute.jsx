import React from 'react';
import PropTypes from 'prop-types';

import LoginPage from 'src/pages/login';


const ProtectedRoute = ({ children }) => {
  localStorage.setItem('token', 'token')
  localStorage.setItem('scope', 'someSpecificScope')
  const token = localStorage.getItem('token');
  const scope = localStorage.getItem('scope');

  // Check if token and scope meet your requirements
  const isAuthenticated = token && scope === 'someSpecificScope';

  if (!isAuthenticated) {
    return  <LoginPage />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
