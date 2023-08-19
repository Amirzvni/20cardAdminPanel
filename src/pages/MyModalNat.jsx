import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import MyModalErr from './MyModalErr'
import classes from "../components/login/Login.module.scss";
import "./modal.css"
import { isValidIranianNationalCode } from './nationalCodeValidation';

import PropTypes from 'prop-types';
function MyModalNat({ handleClose, ...props }) {
    const [otp, setOtp] = useState("");
    const [national, setNational] = useState();
    const [modalShow1, setModalShow1] = React.useState(false);
    const [isValidNationalCode, setIsValidNationalCode] = useState(false);
    const [isInvalidNationalCode, setIsInvalidNationalCode] = useState(false);

    const handleThisPlease = () => {
        console.log("child")
        handleClose()
    }

    useEffect(() => {
        const isValidCode = isValidIranianNationalCode(national);
        setIsValidNationalCode(isValidCode);
    }, [national]);


    const handleSubmit = async e => {
        e.preventDefault();

        const req = {
            code: otp,
            national_code: national
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




        }).then(async res => {
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
                            <label for="otp">کد پیامک شده را وارد نمایید</label>
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
                            <label For="natCode"> کد ملی خود را وارد کنید </label>
                            {/* <input type="number" id='natCode' required onChange={e => setNational(e.target.value)} class="form-control mt-2 mb-2 p-2" onKeyDown={e => {
                                const englishNumberRegex = /^[0-9]*$/;
                                const key = e.key;

                                // Check if the pressed key is a number or allowed special keys
                                if (!englishNumberRegex.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                                    e.preventDefault();
                                }
                            }} /> */}
                            <input type="number" id='natCode' maxLength={11} required onChange={e => {
                                const nationalCode = e.target.value;
                                const isValidCode = isValidIranianNationalCode(nationalCode);
                                setNational(nationalCode);
                                setIsInvalidNationalCode(!isValidCode);
                            }

                            }

                                class={`form-control mt-2 mb-2 p-2 ${isValidNationalCode ? '' : 'invalid'}`}
                                onKeyDown={e => {
                                    const englishNumberRegex = /^[0-9]*$/;
                                    const key = e.key;

                                    // Check if the pressed key is a number or allowed special keys
                                    if (!englishNumberRegex.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                                        e.preventDefault();
                                    }

                                    // Limit the length to 10 digits
                                    if (national.length >= 10 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                                        e.preventDefault();
                                    }
                                }} />
                            {isInvalidNationalCode && <p style={{ color: "red", fontSize: "12px" }}> لطفا کد ملی را به صورت صحیح وارد نمایید </p>}

                            {/* <button type='submit' className='btn btn-primary'>ورود</button> */}
                            {(isValidNationalCode && otp.length === 6) ? (
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

MyModalNat.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default MyModalNat