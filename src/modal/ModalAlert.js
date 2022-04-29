import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalAlert(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">
          이미 민팅을 하셨거나 지갑 잔액이 부족합니다.
        </div>
        <div className="content">
          You already minted or you don't have enough wallet balance.
        </div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAlert;
