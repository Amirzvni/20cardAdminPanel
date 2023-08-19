import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import MyModalErr from './MyModalErr'
import PropTypes from 'prop-types';
import "./modal.css"
function MyModal({ handleClose1, ...props }) {
    const [otp, setOtp] = useState("");
    const [modalShow1, setModalShow1] = React.useState(false);

    const handleThisPlease = () => {
        console.log("child")
        handleClose1()
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const req = {
            code: otp

        }
        const reqF = JSON.stringify(req)
        console.log(reqF)
        const apiUrl = process.env.BASE_URL
        fetch(`${process.env.REACT_APP_BASE_URL}/confirm-user/${props.msg}`, {
            method: 'POST',
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: reqF




        }).then(async (res) => {
            if (res.status == 200) {
                const resp = await res.json();
                console.log("response token is", resp.data.access_token);
                const token = resp.data.access_token

                console.log("promise is resolved", token);
                await sessionStorage.setItem('token', JSON.stringify(token));
                // window.location.replace('/Dashboard')
                window.location.reload()
                console.log("navigTE ...")

            }
            else {
                setModalShow1(true)
            }

        })
    }
    return (
        <div>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <button className='btn' style={{ width: "40px" }} onClick={handleThisPlease}>
                        <img
                            src={require("../assets/images/close.svg").default}
                            alt="illustrator key"
                        />
                    </button>
                </Modal.Header>
                <Modal.Body dir='rtl'>
                    <div className="loginNatMod">
                        <form onSubmit={handleSubmit} className='form-group'>
                            <label for="otp">کد پیامک ارسال شده را وارد کنید</label>
                            <input type="number" id="otp" required onChange={e => setOtp(e.target.value)} class="form-control mt-2 mb-2 p-2" onKeyDown={e => {
                                const englishNumberRegex = /^[0-9]*$/;
                                const key = e.key;

                                // Check if the pressed key is a number or allowed special keys
                                if (!englishNumberRegex.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                                    e.preventDefault();
                                }

                                if (otp.length >= 6 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                                    e.preventDefault();
                                }
                            }} />
                            {/* <button type='submit' className='btn btn-primary'>ورود</button> */}
                            {(otp.length === 6) ? (
                                <button type='submit' className='btn btn-primary'>ورود</button>
                            ) : (
                                <button type='submit' className='btn btn-primary' disabled>ورود</button>
                            )}
                        </form>

                    </div>
                </Modal.Body>

            </Modal>
            <MyModalErr
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />
        </div>
    );
}

MyModal.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default MyModal