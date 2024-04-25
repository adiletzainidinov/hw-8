import styled from "styled-components";

export const Intervals = styled.div`
  color: ${(props) =>
    props.active ? "rgb(239, 239, 239)" : "rgb(145, 148, 152)"};
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0%;
  cursor: pointer;
`;
