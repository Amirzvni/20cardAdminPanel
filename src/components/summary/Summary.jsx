import React, { useState, useEffect } from "react"

import SummaryBox from "./SummaryBox";
import { useTranslation } from "react-i18next";
import classes from "./Summary.module.scss";
import { IsummData } from "../../interfaces/IsummData";

function Summary() {
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [summary, setSummary] = useState({});

  const fetchData = async () => {
    const apiUrl = process.env.BASE_URL
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/dashboard`, {
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
        console.log("11111111reeeeeeee", data)
        await setSummary(data)


      }).catch(err => console.log("err", err))

  }
  useEffect(() => {
    fetchData()
  }, [])



  const { t } = useTranslation();
  return (
    <section className={classes.summary}>
      {/* <p className="subTitle">{t("summary")}</p> */}
      <div className={classes.summary__box}>

        <SummaryBox summary={summary} setSummary={setSummary} />

      </div>
    </section>
  );
}

export default Summary;
