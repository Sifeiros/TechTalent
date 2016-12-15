import React from 'react';
import {
  Alert
} from 'react-bootstrap';
// import './LoadingIndicator.scss';

export const LoadingIndicator = function (props) {
  if (props.error) {
    return (
      <Alert bsStyle='warning'>
        <strong>Error:</strong> {props.error}
      </Alert>
    );
  } else if (!props.isFetched) {
    return (<div>Loading</div>);
  } else {
    return <props.element {...props} />;
  }
};

LoadingIndicator.propTypes = {
  isFetched: React.PropTypes.bool.isRequired,
  element: React.PropTypes.func.isRequired,
  error: React.PropTypes.string
};

export default LoadingIndicator;
