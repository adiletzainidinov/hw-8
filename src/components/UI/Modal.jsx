import PropTypes from "prop-types";
import styled from "styled-components";

const AppModal = ({ children }) => {
  return (
    <BackDrop>
      <Modal>{children}</Modal>
    </BackDrop>
  );
};

export default AppModal;

const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 100;
  background-color: white;
  border-radius: 10px;
  width: 40rem;
  top: 30vh;
  left: calc(50% - 20rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 20px;
`;

AppModal.propTypes = {
  children: PropTypes.element.isRequired,
};
