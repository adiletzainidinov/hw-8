import { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ProgressBar = forwardRef((props, ref) => {
  return (
    <ProgressBarWrapper>
      <ProgressDiv ref={ref} />
    </ProgressBarWrapper>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
ProgressBar.propTypes = {
  width: PropTypes.string.isRequired,
};

const ProgressDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #4287f5;
  border-radius: 10px;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  background-color: #232931;
`;
