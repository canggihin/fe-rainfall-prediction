import React from 'react';
import PropTypes from 'prop-types';

import LoginPage from 'src/pages/login';


const ProtectedRoute = ({ children }) => {
  const token = "token";
  const isAuthenticated = token && token != null;

  // Check if token and scope meet your requirements

  if (!isAuthenticated) {
    return  <LoginPage />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
