import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalAuth(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">이메일 인증을 해주세요.</div>
        <div className="content">Please authenticate your email.</div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAuth;
