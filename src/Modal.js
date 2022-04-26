import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalEvent(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">이벤트 대상자가 아닙니다!</div>
        <div className="content"> You are not eligible for the event!</div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalEvent;
