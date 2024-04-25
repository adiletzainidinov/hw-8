import styled from "styled-components";
import { Intervals } from "../UI/Intervals";

export const PomodoroMode = () => {
  return (
    <StyledDiv>
      <Intervals>Focus</Intervals>
      <Intervals>Break</Intervals>
      <Intervals>Rest</Intervals>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 24px 93px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
