import React from 'react';
// import './LoadingIndicator.scss';

export const LoadingIndicator = function (props) {
  if (!props.isFetched) {
    return (<div>Loading</div>);
  } else {
    return <props.element {...props} />;
  }
};

LoadingIndicator.propTypes = {
  isFetched: React.PropTypes.bool.isRequired,
  element: React.PropTypes.func.isRequired
};

export default LoadingIndicator;
