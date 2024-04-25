import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled("div")`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: url(),
    linear-gradient(180deg, rgb(220, 236, 255), rgb(135, 174, 218) 128.073%);
`;

export const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};
