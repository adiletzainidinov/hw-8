import { Title } from "../UI/AppTitle";
import { Container } from "../layouts/Container";
import styled from "styled-components";
import { PomodoroMode } from "./PomodoroMode";
import ProgressBar from "./ProgressBar";
import TimeView from "../UI/TimeView";
import Button from "../UI/Button";
import PomodoroForm from "./PomodoroForm";
import { useEffect, useRef, useState } from "react";

export const Pomodoro = () => {
  const [modal, setModal] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const progressBar = useRef();

  let intervalId = useRef(null);
  const [pomodoroTimes, setPomodoroTimes] = useState({
    focus: 0,
    break: 0,
    rest: 0,
    autoStartBreaks: false,
    autoStartPomodoro: false,
    interval: 0,
    initialInterval: 0,
  });

  useEffect(() => {
    if (isActive) {
      intervalId.current = setInterval(() => {
        setTime((prevState) => {
          const updatedTime = prevState - 1;
          proggress(updatedTime);

          if (updatedTime <= 0) {
            stopTimer();
          }

          return updatedTime;
        });
      }, 100);
    } else {
      clearInterval(intervalId.current);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isActive]);

  const startTimer = () => {
    setActive(true);
  };

  const modalHandler = () => {
    setModal((prevState) => !prevState);
  };

  function getTimeValues(data) {
    setPomodoroTimes((prevState) => {
      return {
        ...prevState,
        data,
        initialInterval: data.interval,
      };
    });
    setTime(data.focus * 60);
  }

  const stopTimer = () => {
    setActive(false);
    clearInterval(intervalId.current);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function proggress(initialTime) {
    const progresDiv = progressBar.current;
    const percent = (initialTime / (1 * 60)) * 100;
    progresDiv.style.width = `${percent}%`;
  }

  return (
    <Container>
      {modal && (
        <PomodoroForm closeModal={modalHandler} onSubmit={getTimeValues} />
      )}
      <StyledTitle>Pomodoro</StyledTitle>
      <StyledDiv>
        <PomodoroMode />
        <ProgressBar ref={progressBar} />
        <TimeViewWrapper>
          <TimeView time={formatTime(time)} />
        </TimeViewWrapper>
        <TimeViewWrapperExchanged>
          {isActive ? (
            <Button onClick={stopTimer}>Stop</Button>
          ) : (
            <Button onClick={startTimer}>Start</Button>
          )}
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
