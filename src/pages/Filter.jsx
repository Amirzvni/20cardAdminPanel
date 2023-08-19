import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import MyModalErr from './MyModalErr'
import PropTypes from 'prop-types';
import "./modal.css"
function Filter(props) {


    return (
        <div>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >

                <Modal.Body dir='rtl' className="custom-modal">
                    <div>
                        <h2>hello</h2>
                    </div>
                </Modal.Body>

            </Modal>

        </div>
    )
};


export default Filter