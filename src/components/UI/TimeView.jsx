import PropTypes from "prop-types";
import styled from "styled-components";

const TimeView = ({ time }) => {
  return <TimeViewStyles>{time}</TimeViewStyles>;
};

TimeView.propTypes = {
  time: PropTypes.string.isRequired,
};

export default TimeView;

const TimeViewStyles = styled.div`
  box-sizing: border-box;
  font-size: 131px;
  color: #efefef;
`;
