import { Link } from "react-router-dom";
import classes from "./DashboardTables.module.scss";
import { useTranslation } from "react-i18next";
import CustomTable from "./customTable/CustomTable";
import data from "../../constants/data";
import React, { useState, useEffect } from "react"
const Table = () => {
  const { t } = useTranslation();
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [trans, setTrans] = useState([]);
  const fetchData = async () => {
    const apiUrl = process.env.BASE_URL
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/list-transaction-user`, {
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
        await setTrans(data)


      }).catch(err => console.log("err", err))

  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <section className={classes.table}>
      <div
        className={`${classes.table__top__customers} ${classes.table__child}`}
      >

      </div>
      <div
        className={`${classes.table__latest__orders} ${classes.table__child}`}
      >
        <div className={classes.table__title}>
          <p className="subTitle">{t("latestTransaction")}</p>
          {/* <Link to="/">{t("viewAll")}</Link> */}
        </div>
        <CustomTable
          trans={trans}
          setTrans={setTrans}
        />
      </div>
    </section>
  );
};

export default Table;
