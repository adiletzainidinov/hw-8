import { Title } from '../UI/AppTitle';
import { Container } from '../layouts/Container';
import styled from 'styled-components';
import { PomodoroMode } from './PomodoroMode';
import ProgressBar from './ProgressBar';
import TimeView from '../UI/TimeView';
import Button from '../UI/Button';
import PomodoroForm from './PomodoroForm';
import { useEffect, useRef, useState } from 'react';
import clockSoundFile from '../../audio/71600155dfdea36.mp3';
import rainSound from '../../audio/Neffex - Grateful.mp3';
import AppModal from './../UI/Modal';
import InputRef from '../UI/InputRef';

export const Pomodoro = () => {
  const audioRain = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const progressBar = useRef();
  const clockSound = useRef(null);

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
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isActive]);

  const playSoundClock = () => {
    clockSound.current.play();
    setTimeout(() => {
      clockSound.current.pause();
      clockSound.current.currentTime = 0;
    }, 500);
  };

  const startTimer = () => {
    if (!isActive) playSoundClock();

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
    playSoundClock();
    clearInterval(intervalId.current);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  function proggress(initialTime) {
    const progresDiv = progressBar.current;
    const percent = (initialTime / (1 * 60)) * 100;
    progresDiv.style.width = `${percent}%`;
  }

  const playAudio = () => {
    audioRain.current.play();
  };

  const pauseAudio = () => {
    audioRain.current.pause();
  };

  return (
    <Container>
      <audio ref={clockSound}>
        <source src={clockSoundFile} type="audio/mpeg" />
      </audio>
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
          <audio ref={audioRain}>
            <source src={rainSound} type="audio/mpeg" />
          </audio>

          <AudioButtons>
            <ButtonAudio onClick={playAudio}>PLay sound</ButtonAudio>
            <ButtonAudio onClick={pauseAudio}>Pause sound</ButtonAudio>
          </AudioButtons>
          <SettingStyled
            onClick={() => setSettingsOpen((prevState) => !prevState)}
          >
            Setting
          </SettingStyled>
          {settingsOpen && (
            <AppModal>
              <SettingWrapper>
                <div>
                  {' '}
                  <InputRef
                    labelText="Auto Start Breaks"
                    type="checkbox"
                    padding="checkbox"
                    border="checkbox"
                    borderRadius="checkbox"
                  />
                </div>
                <div>
                  <InputRef
                    labelText="Auto Start Pomodoros"
                    type="checkbox"
                    padding="checkbox"
                    border="checkbox"
                    borderRadius="checkbox"
                  />
                </div>
                <div>
                  <InputRef
                    labelText="Long Break Interval"
                    type="number"
                    padding="input"
                    border="input"
                    borderRadius="input"
                  />
                </div>
                <ButtonSave
                  onClick={() => setSettingsOpen((prevState) => !prevState)}
                >
                  Save
                </ButtonSave>
              </SettingWrapper>
            </AppModal>
          )}
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

const ButtonSave = styled.button`
  margin: 0 auto;
  padding: 7px 45px;
  color: white;
  border-radius: 10px;
  border: none;
  background-color: #2158bd;
  font-size: 24px;
  margin-top: 30px;
`;

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
`;

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

const ButtonAudio = styled.button`
  background-color: #26be68;
  border: none;
  border-radius: 15px;
  width: 150px;
  height: 60px;
  padding: 10px 25px;
  &:hover {
    background-color: #77b090;
  }
  &:active {
    background-color: #0b4b27;
  }
`;

const AudioButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 200px;
`;

const SettingStyled = styled.h3`
  position: absolute;
  bottom: 100px;
  left: 310px;
  color: black;
  width: 120px;
  height: 60px;
  background-color: #abd443;
  text-align: center;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: 100;
`;
