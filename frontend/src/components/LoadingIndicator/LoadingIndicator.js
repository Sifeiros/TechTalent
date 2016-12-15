import React from 'react';
// import './LoadingIndicator.scss';

export const LoadingIndicator = function (props) {
  if (props.isLoading) {
    return (<div>Loading</div>);
  } else {
    return props.children;
  }
};

LoadingIndicator.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired
};

export default LoadingIndicator;
