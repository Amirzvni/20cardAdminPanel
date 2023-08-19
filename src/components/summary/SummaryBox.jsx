import React, { useState , useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IsummData as Props } from "../../interfaces/IsummData";
import { Icon } from "@iconify/react";

import Card from "../UI/card/Card";
import numeral from 'numeral';
import classes from "./SummaryBox.module.scss";
import { formatNumber } from './numberUtils';


const SummaryBox = (props) => {
  const { t } = useTranslation();
  const [className , setClassName] = useState('')
  
  useEffect(()=>{
    const handleResize = () => {

      const screenWid = window.innerWidth
      if (screenWid > 1024) {
        setClassName("d-flex")
      } else {
        setClassName("d-block")
      }
    }

    handleResize()
    window.addEventListener("resize" , handleResize)
    return () => {
      window.removeEventListener("resize" , handleResize)
    }

  }, [])
  const renderSumBadge = (amount) => {
    // if (amount === "0") {
    //   const price = '0';
    //   return price
    // } else {
    // const price = numeral(amount).format('0,0');
    // const priceF = price.toLocaleString('fa')
    if (amount !== undefined && amount !== null) {
      const price = formatNumber(amount); // Format the number if amount exists
      return price
    }

    // }
  };

  console.log("props", props)
  return (
    <div className={className}>
      <div className={classes.summary__box}>
        <Card>
          <div className={classes.summary__box__wrapper}>
            <div className={classes.summary__box__icon}>
              <Icon icon={"akar-icons:shopping-bag"} width="56" />
            </div>
            <div className={classes.summary__box__info}>
              <p>مجموع خرید ها</p>
              <div className={classes.summary__box__info__amount}>
                {/* <h4>{props.summary.sum}</h4> */}
                <h4>{renderSumBadge(props.summary.sum)}</h4>
                <sup>تومان</sup>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className={classes.summary__box}>
        <Card>
          <div className={classes.summary__box__wrapper}>
            <div className={classes.summary__box__icon}>
              <Icon icon={"icon-park-outline:transaction-order"} width="56" />
            </div>
            <div className={classes.summary__box__info}>
              <p> تراکنش ها</p>
              <div className={classes.summary__box__info__amount}>

                <h4>{renderSumBadge(props.summary.count)}</h4>
                {/* <sup>تومان</sup> */}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.summary__box}>
        <Card>
          <div className={classes.summary__box__wrapper}>
            <div className={classes.summary__box__icon}>
              <Icon icon={"jam:credit-card"} width="56" />
            </div>
            <div className={classes.summary__box__info}>
              <p>کارت های فعال  </p>
              <div className={classes.summary__box__info__amount}>
                {/* <h4>{props.summary.activeCard}</h4> */}
                <h4>{renderSumBadge(props.summary.activeCard)}</h4>
                {/* <sup>تومان</sup> */}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SummaryBox;
