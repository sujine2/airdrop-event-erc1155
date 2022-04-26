import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalEmpty(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">주소를 입력해주세요.</div>
        <div className="content">Please enter your address</div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalEmpty;
