import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { formatNumberWithoutComma } from './numberUtils';
function Profile() {
  const [id, setId] = useState();
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);

  const fetchData = async () => {
    const apiUrl = process.env.BASE_URL
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        console.log("object", response);
        const { data } = await response.json();
        const code = formatNumberWithoutComma(data.NID)
        setId(code)


      }).catch(err => console.log("err", err))

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <a href="/profile">
          <img src={images.avt} alt="avatar" />
        </a>
      </div>
      <div className={classes.profile__info}>
        <a href="/profile">
          <p className={classes.profile__userName}>{id}</p>
        </a>
        {/* <span className={classes.profile__role}>{t("admin")}</span> */}
      </div>
    </div>
  );
}

export default Profile;
