import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Loginpage.css"
import React, { useState, useContext, useEffect, useRef } from 'react';
function TermModal(props) {

    const [term, setTerm] = useState();


    const fetchData = async () => {
        const apiUrl = process.env.BASE_URL
        await fetch(`${process.env.REACT_APP_BASE_URL}/term`, {
            method: 'GET',
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                console.log("object", response);
                const { data } = await response.json();
                console.log("11111111reeeeeeee", data)
                await setTerm(data.description)


            }).catch(err => console.log("err", err))

    }
    useEffect(() => {
        fetchData()
    }, [])



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
                <div>
                    <p>
                        <div dangerouslySetInnerHTML={{ __html: term }}></div>
                    </p>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide} className='bg-danger ErrClose'>بستن</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
export default TermModal