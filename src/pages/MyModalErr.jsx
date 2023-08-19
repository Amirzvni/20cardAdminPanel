import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Loginpage.css"

function MyModalErr(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>

            </Modal.Header> */}
            <Modal.Body className='ErrBody d-flex flex-column align-items-center ' closeButton>
                <img
                    className='imgErr mb-3'
                    src={require("../assets/images/299045_sign_error_icon.png")}
                    alt="illustrator key"
                />
                <br />
                <br />

                <p>
                    لطفا دوباره تلاش کنید
                </p>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide} className='bg-danger ErrClose'>بستن</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
export default MyModalErr