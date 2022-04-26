import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalAlert(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">민팅은 1인당 1회로 제한됩니다.</div>
        <div className="content">Minting is limited to one per person.</div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAlert;
