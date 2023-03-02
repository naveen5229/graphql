import { Modal, Button } from 'react-bootstrap';

const ModalComponent = (props) => {
    return     <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.children}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
        <Button variant="primary" onClick={props.handleCreate}>Create</Button>
      </Modal.Footer>
    </Modal>
  </div>

}

export default ModalComponent;