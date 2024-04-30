import { forwardRef } from 'react';
import { styled } from 'styled-components';

const InputRef = forwardRef(
  ({ type, onChange, labelText, padding, border, borderRadius }, ref) => {
    return (
      <InputsContainer>
        <label>{labelText}</label>
        <InputStyle
          ref={ref}
          type={type}
          onChange={onChange}
          padding={padding}
          border={border}
          borderRadius={borderRadius}
        />
      </InputsContainer>
    );
  }
);

export default InputRef;

function getPadding({ padding }) {
  return padding === 'checkbox' ? '0' : padding === 'input' ? '5px 20px' : '';
}

function getBorder({ border }) {
  return border === 'checkbox'
    ? '1px solid #2158bd'
    : border === 'input'
    ? '1px solid #2158bd'
    : '';
}

function getBorderRadius({ borderRadius }) {
  return borderRadius === 'checkbox'
    ? '20px'
    : borderRadius === 'input'
    ? '7px'
    : '';
}

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputStyle = styled.input`
  padding: ${getPadding};
  border: ${getBorder};
  border-radius: ${getBorderRadius};
  
`;
