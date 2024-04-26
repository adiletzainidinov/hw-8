import { Title } from "../UI/AppTitle";
import { Container } from "../layouts/Container";
import styled from "styled-components";
import { PomodoroMode } from "./PomodoroMode";
import ProgressBar from "./ProgressBar";
import TimeView from "../UI/TimeView";
import Button from "../UI/Button";
import PomodoroForm from "./PomodoroForm";
import { useState } from "react";

export const Pomodoro = () => {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal((prevState) => !prevState);
  };

  function getTimeValues(data) {
    console.log(data);
  }
  return (
    <Container>
      {modal && (
        <PomodoroForm closeModal={modalHandler} onSubmit={getTimeValues} />
      )}
      <StyledTitle>Pomodoro</StyledTitle>
      <StyledDiv>
        <PomodoroMode />
        <ProgressBar width="50%" />
        <TimeViewWrapper>
          <TimeView time="30:00" />
        </TimeViewWrapper>
        <TimeViewWrapperExchanged>
          <Button>Start</Button>
        </TimeViewWrapperExchanged>
        <PositionedButton>
          <Button icon onClick={modalHandler}>
            🕦
          </Button>
        </PositionedButton>
      </StyledDiv>
    </Container>
  );
};

const StyledTitle = styled(Title)`
  margin-top: 66px;
`;

const StyledDiv = styled.div`
  background-color: #232931;
  box-sizing: border-box;
  border: 1px solid rgb(175, 179, 183);
  border-radius: 4px;
  position: relative;
`;

const TimeViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeViewWrapperExchanged = styled(TimeViewWrapper)`
  margin-bottom: 67px;
`;

const PositionedButton = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
`;
