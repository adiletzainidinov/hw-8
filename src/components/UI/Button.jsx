import styled from "styled-components";
import PropTypes from "prop-types";

const Button = ({ children, onClick, icon, ...rest }) => {
  return (
    <StyledButton onClick={onClick} icon={icon} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.bool,
};

const StyledButton = styled.button`
  border: none;
  border-radius: ${(props) => (props.icon ? "50%" : "16.39px")};
  background: ${(props) => (props.icon ? "none" : "rgb(160, 203, 255)")};
  padding: 16.39px 24.59px;
  color: rgb(35, 41, 49);
  font-size: ${(props) => (props.icon ? "20px" : "32.78px")};
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 0%;
  cursor: pointer;
  transition: background 0.3s ease-in;
  &:hover {
    background: ${(props) =>
      props.icon ? "rgb(62, 56, 54)" : "rgb(176, 204, 238)"};
  }
  &:active {
    background: rgb(69, 106, 151);
  }
`;
