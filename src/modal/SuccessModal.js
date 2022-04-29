import { Modal } from "react-bootstrap";
import React from "react";
import "./Modal.css";

function ModalSuccess(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <br />
        <div className="content">
          NFT가 발급되었습니다. Opensea 에서 확인해 보세요!
        </div>
        <div className="content">
          NFT has been issued. Check it out at Opensea!
        </div>
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default ModalSuccess;
