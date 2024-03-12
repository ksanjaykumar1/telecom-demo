import PropTypes from 'prop-types';

const Loading = ({ center = true }) => {
  return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};
Loading.propTypes = {
  center: PropTypes.bool, // Indicates whether the loading indicator should be centered
};

export default Loading;
