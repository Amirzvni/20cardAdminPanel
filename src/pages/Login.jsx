import React, { useState, useContext, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from './MyModal'
import MyModalErr from './MyModalErr'
import MyModalNat from './MyModalNat'
import TermModal from './TermModal'
import { ReactSVG } from 'react-svg';
import classes from "../components/login/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import langContextObj from "../store/langContext";
import { images } from "../constants";
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css"

const Login = () => {
  const { t } = useTranslation();
  const langCtx = useContext(langContextObj);
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [code, setCode] = useState();
  const [err, setErr] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(180);
  const [counterFinished, setCounterFinished] = useState(false);

  const counterRef = useRef(null);
  const handleClose = () => {
    console.log("shod ya na ?")
    setModalShow2(false);
  };
  const handleClose1 = () => {
    console.log("shod ya na ?")
    setModalShow(false);
  };
  console.log("pgpgpgpg", phone)
  console.log("envvvvvv", process.env.REACT_APP_BASE_URL);
  const handleTermsClick = () => {
    setModalShow3(true);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    setShowSubmitButton(false);
    setShowCounter(true);
    setCounterFinished(false);
    startCounter();

    const req = {
      phone: phone
    }

    const reqF = JSON.stringify(req)
    // console.log(reqF)
    const apiUrl = process.env.REACT_APP_BASE_URL
    console.log("envvvvvv", process.env.BASE_URL);
    fetch(`${process.env.REACT_APP_BASE_URL}/register-user`, {
      method: 'POST',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: reqF




    }).then(async (res) => {
      console.log("post res", res);
      const { data } = await res.json();
      console.log("data add user ", data);
      setId(data.id)
      setCode(data.national_code)
      console.log("data add user ", res);
      console.log("data add user ", data);
      if (res.status == 200 && data.national_code) {
        setModalShow2(true)
      }
      else if (res.status == 200 && !data.national_code) {
        setModalShow(true)
      }
      else {
        console.log("errrrrrrrrrrrrrrrrrr", data.message)
        // setModalShow1(true)
      }
    })
  }

  const startCounter = () => {
    counterRef.current = counter;

    counterRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        const count = prevCounter - 1;
        if (count <= 0) {
          clearInterval(counterRef.current);
          setShowCounter(false);
          setCounterFinished(true);
        }
        return count;
      });
    }, 1000);
  };

  const handleRetrySubmit = () => {
    setCounter(180);
    console.log("conter set to 10")
    setShowCounter(true);
    console.log("counter show is true")
    setCounterFinished(false);
    console.log("counter finish is false")
    setShowSubmitButton(false);
    console.log("show sub btn is false")
    startCounter();
    console.log("counter start")


    const req = {
      phone: phone
    }

    const reqF = JSON.stringify(req)
    // console.log(reqF)
    const apiUrl = process.env.REACT_APP_BASE_URL
    console.log("envvvvvv", process.env.BASE_URL);
    fetch(`${process.env.REACT_APP_BASE_URL}/register-user`, {
      method: 'POST',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: reqF




    }).then(async (res) => {
      console.log("post res", res);
      const { data } = await res.json();
      console.log("data add user ", data);
      setId(data.id)
      setCode(data.national_code)
      console.log("data add user ", res);
      if (res.status == 200 && data.national_code) {
        setModalShow2(true)
      }
      else if (res.status == 200 && !data.national_code) {
        setModalShow(true)
      }
      else {
        console.log("errrrrrrrrrrrrrrrrrr", data.message)
        // setModalShow1(true)
      }
    })
  };

  useEffect(() => {
    if (counterFinished) {
      setShowSubmitButton(false);
    }
  }, [counterFinished]);

  useEffect(() => {
    return () => {
      clearTimeout(counterRef.current);
    };
  }, []);

  const getProgress = () => {
    return 100 - (counter / 10) * 100; // Adjust the denominator based on your initial counter value
  };

  return (

    <div
      className={`${classes.container} ${langCtx.lang === "fa" ? classes.rtl : ""
        }`}
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          {/* <img src={images.logo} alt="biscart" /> */}
          <img
            src={require("../assets/images/log.svg").default}
            alt="illustrator key"
            className='mt-4'
          />
        </div>
        <h4 className={classes.title}>ورود به
          <br />
          حساب کاربری</h4>
        <form onSubmit={handleFormSubmit} className='form-group'>
          <label For="phone"> شماره تلفن </label> <br />
          {/* <input
            className="form-control mt-2 mb-2 p-2"
            type="text"
            id="phone"
            maxLength={11}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={e => {
              const englishNumberRegex = /^[0-9]*$/;
              const key = e.key;

              // Check if the pressed key is a number or allowed special keys
              if (!englishNumberRegex.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                e.preventDefault();
              }
            }}
            placeholder=" 0912XXXXXXX "
          /> */}
          <input
            className="form-control mt-2 mb-2 p-2"
            type="text"
            id="phone"
            maxLength={11}
            minLength={11}
            value={phone} // Add the value prop and bind it to the 'phone' state
            onChange={e => {
              const inputValue = e.target.value;
              let formattedValue = '';

              if (inputValue.length === 0) {
                formattedValue = '';
              } else if (inputValue.length === 1) {
                formattedValue = inputValue[0] === '0' ? '0' : '';
              } else if (inputValue.length === 2) {
                formattedValue = inputValue[0] === '0' && inputValue[1] === '9' ? '09' : inputValue[0];
              } else {
                formattedValue = inputValue;
              }

              setPhone(formattedValue);
            }}
            onKeyDown={e => {
              const key = e.key;
              const inputValue = e.target.value;

              if (inputValue.length === 1 && key === 'Backspace') {
                setPhone('');
              }

              // Check if the pressed key is '0' or '9'
              if ((inputValue.length === 0 && key !== '0') || (inputValue.length === 1 && key !== '9')) {
                e.preventDefault();
              }
            }}
            placeholder=" 0912XXXXXXX "
          />







          <label className='mb-3'>
            <input
              type="checkbox"

              required
            />
            <span className="terms-link" onClick={handleTermsClick}>
              <bdi>

                شرایط و قوانین
              </bdi>
            </span>

            {/* &nbsp; */}
            را میپذیرم





          </label>

          {/* <Button type="submit">{t("login")}</Button> */}
          {/* {showSubmitButton && <button type="submit">Submit</button>} */}
          {!showCounter && showSubmitButton && <button className='btn btn-primary mt-1' type="submit">ورود</button>}
          {!showCounter && !showSubmitButton && counterFinished && <button className='btn btn-primary mt-1' onClick={handleRetrySubmit}> ارسال مجدد </button>}
          {showCounter &&
            <div>
              <div className="submit-message" dir='ltr'>: امکان ارسال مجدد در  </div>
              <div className="loader-container">
                <br />
                <div className="loader">
                  <div className="progress"></div>
                  <div className="count">{counter}</div>
                </div></div></div>}


          {/* {showCounter && (
            <div>
              <p>{counter} seconds remaining</p>
              {counterFinished && (
                <button onClick={handleRetrySubmit}>
                  Submit again
                </button>
              )}
            </div>
          )} */}
        </form>
      </div>

      <div className={classes.keyPic}>
        <img
          src={require("../assets/images/shit.svg").default}
          alt="illustrator key"
        />
      </div>
      <MyModal
        show={modalShow}
        msg={id}
        setMsg={setId}
        msg2={code}
        setMsg2={setCode}
        handleClose1={handleClose1}
      />
      <MyModalErr
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />
      <TermModal
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
      <MyModalNat
        show={modalShow2}
        // onHide={() => setModalShow2(false)}
        // onHide={handleClose}
        msg={id}
        setMsg={setId}
        msg2={code}
        setMsg2={setCode}
        handleClose={handleClose}
      />
    </div>
  )
}




export default Login