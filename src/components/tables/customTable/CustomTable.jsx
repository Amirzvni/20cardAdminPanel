import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from 'moment-jalaali';
import numeral from 'numeral';
import { formatNumberWithoutComma, formatNumber, convertToPersianDateTime } from './numberUtils';
import { Icon } from "@iconify/react";
import "./CustomTable.css"
import classes from "./CustomTable.module.scss";
const CustomTable = (props) => {
  const { t } = useTranslation();
  console.log("propdfdfdgs", props)
  const [date, setDate] = useState(props.created_at);
  const { trans } = props;
  const renderTypePaymentBadge = (typePayment) => {
    if (typePayment === 'decrease') {
      return <span className="badge bg-danger">برداشت</span>;
    } else if (typePayment === 'increase') {
      return <span className="badge bg-success">واریز</span>;
    } else if (typePayment === 'credit_decrease') {
      return <span className="badge bg-danger">اعتبار</span>;
    } else if (typePayment === 'credit_increase') {
      return <span className="badge bg-success">اعتبار</span>;
    }
    return null;
  };
  const renderStatusBadge = (status) => {
    if (status === 'submit') {
      return <span className="badge bg-warning">در حال انجام</span>;
    } else if (status === 'finish') {
      return <span className="badge bg-success">موفق</span>;
    } else if (status === 'revers') {
      return <span className="badge bg-danger">ناموفق</span>;
    } else if (status === 'credit_decrease') {
      return <span className="badge bg-danger">اعتبار</span>;
    } else if (status === 'credit_increase') {
      return <span className="badge bg-success">اعتبار</span>;
    }
    return null;
  };
  const renderDateBadge = (created_at) => {
    const gregorianDate = created_at.slice(0, 10) + "-" + created_at.slice(11, 19);
    const persianDate = moment(gregorianDate, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    const persianDate1 = convertToPersianDateTime(persianDate)
    return persianDate1
  };
  const renderAmountBadge = (amount) => {
    // const price = numeral(amount).format('0,0');
    const price = formatNumber(amount)
    return price
  };

  return (
    <div className="table-container d-flex flex-column align-items-center">


      <table className="my-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>نام تجاری</th>
            <th>مبلغ</th>
            <th>نوع</th>
            <th>وضعیت</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>

          {trans.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'even' : ''}>
              <td>{formatNumberWithoutComma(item.id)}</td>

              <td>{item.info}</td>
              <td>{renderAmountBadge(item.amount)}</td>
              <td>{renderTypePaymentBadge(item.type_payment)}</td>
              <td>{renderStatusBadge(item.status)}</td>
              <td>{renderDateBadge(item.created_at)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>



  );
};

export default CustomTable;
