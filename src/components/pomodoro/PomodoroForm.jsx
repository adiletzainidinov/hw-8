import { useRef } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import PropTypes from "prop-types";
import { FormInput } from "../UI/Input";
import { Intervals } from "../UI/Intervals";
import AppModal from "../UI/Modal";

// useRef

const PomodoroForm = ({ closeModal, onSubmit }) => {
  const focusRef = useRef(null);
  const breakRef = useRef(null);
  const restRef = useRef(null);
  // new code for lesson 29.04.24
  const autoStartBreaks = useRef(null);
  const autoStartPomodoro = useRef(null);
  const longBreakInterval = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const focusValue = focusRef.current.value;
    const breakValue = breakRef.current.value;
    const restValue = restRef.current.value;
    const autoStartValue = autoStartBreaks.current;
    const autoPomodoroValue = autoStartPomodoro.current;
    const longBreakValue = longBreakInterval.current.value;
    if (!focusValue && !breakValue && !restValue) {
      focusRef.current.focus();
      return;
    }

    onSubmit({
      focus: +focusValue,
      break: +breakValue,
      rest: +restValue,
      autoStartBreaks: autoStartValue.checked,
      autoStartPomodoro: autoPomodoroValue.checked,
      interval: +longBreakValue,
    });
    closeModal();
  };

  return (
    <AppModal>
      <StyledForm>
        <Intervals>Settings</Intervals>
        <StyledDiv>
          <StyledInput labelText="Focus" ref={focusRef} />
          <StyledInput labelText="Break" ref={breakRef} />
          <StyledInput labelText="Rest" ref={restRef} />
          <StyledInput
            labelText="Auto Start Breaks"
            ref={autoStartBreaks}
            type="checkbox"
          />
          <StyledInput
            labelText="Auto Start Pomodoros"
            ref={autoStartPomodoro}
            type="checkbox"
          />
          <StyledInput
            labelText="Long Break Interval"
            ref={longBreakInterval}
          />
        </StyledDiv>
        <div>
          <Button type="submit" onClick={onSubmitHandler}>
            Save
          </Button>
          <Button icon onClick={closeModal}>
            ✖️
          </Button>
        </div>
      </StyledForm>
    </AppModal>
  );
};

PomodoroForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default PomodoroForm;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 30px;
`;
const StyledForm = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(FormInput)`
  width: 110px;
`;
