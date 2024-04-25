import styled from "styled-components";

export const ProgressBar = () => {
  return <StyledWrapper></StyledWrapper>;
};

const StyledWrapper = styled("div")`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: -5px -5px 50px 0px rgba(255, 255, 255, 0.5),
    5px 5px 50px 0px rgba(0, 0, 0, 0.25),
    inset 5px 5px 50px 0px rgba(0, 0, 0, 0.4),
    inset -5px -5px 50px 0px rgba(255, 255, 255, 0.5);
  background: rgb(208, 71, 255);
`;
