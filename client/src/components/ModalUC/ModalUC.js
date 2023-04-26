import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

const ModalUC = ({modalText, type="secondary", show, onHide, executingFunction, funcValue}) => {
    const click = ()=> {
        onHide(false);
        if (executingFunction) executingFunction(funcValue || '')
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} centered={true}>
                <Modal.Body>
                    <p>{modalText}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={click} variant={type}>OK</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export {ModalUC}
