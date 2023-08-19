import React, { useState, useEffect } from 'react';
import moment from 'moment-jalaali';
import "./profile.css"
import { formatNumberWithoutComma, convertToPersianNumbers } from './numberUtils';
function BlankPage() {
  // const [id, setId] = useState();
  const [name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [nid, setNid] = useState();
  const [status, setStatus] = useState();
  const [statusRaw, setStatusRaw] = useState();
  const [date, setDate] = useState();
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
        console.log("11111111reeeeeeee", data)
        // setId(data.id)
        const phone1 = formatNumberWithoutComma(data.phoneNumber)
        const NID1 = formatNumberWithoutComma(data.NID)
        setName(data.full_name)
        setPhone(phone1)
        setNid(NID1)
        // setStatusRaw(data.status)
        // setDate(data.created_at)
        if (data.status === 'active') {
          setStatus('فعال')
        } else if (data.status === 'passive') {
          setStatus('غیر فعال')
        }

        const cutDateYear = data.created_at.slice(0, 4)
        const cutDateMonth = data.created_at.slice(5, 7)
        const cutDateDay = data.created_at.slice(8, 10)
        const gregorianDate = data.created_at.slice(0, 10);
        const persianDate = moment(gregorianDate, 'YYYY-MM-DD').format('jYYYY/jM/jD');
        const date1 = convertToPersianNumbers(persianDate)
        setDate(date1)
        console.log("per date", persianDate)
        console.log("year", cutDateYear, 'month', cutDateMonth, 'day', cutDateDay)
      }).catch(err => console.log("err", err))

  }

  useEffect(() => {
    fetchData()
  }, [])

  // console.log("id", id, "name", name)

  return <div>
    <div>
      <p className='title'>پروفایل کاربر</p>
    </div>
    <div className="">
      <div className='row'>
        <p id='profileNav'>جزئیات</p>
      </div>
      <div className="row">
        {/* <div className="col-6 mb-3">
          <label htmlFor="id"> ایدی کاربر </label>
          <input type="text" id='id' className="form-control" value={id} readOnly></input>
        </div> */}
        <div className="col-6 mb-3">
          <label htmlFor="full_name" className='labels'> نام   </label>
          <input type="text" id="full_name" className="form-control inputs" value={name} readOnly></input>
        </div>
        <div className="col-6 mb-3">
          <label htmlFor="full_name" className='labels'> نام خانوادگی  </label>
          <input type="text" id="full_name" className="form-control inputs" value={LastName} readOnly></input>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label htmlFor="phoneNumber" className='labels'> شماره تلفن   </label>
          <input type="text" id="phoneNumber" className="form-control inputs" value={phone} readOnly>
          </input>
        </div>
        <div className="col-6">
          <label htmlFor="NID" className='labels'> کد ملی    </label>
          <input type="text" id="NID" className="form-control inputs" value={nid} readOnly>
          </input>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="status" className='labels'> وضعیت  </label>
          <input type="text" id="status" className="form-control inputs" value={status} readOnly>
          </input>
        </div>
        <div className="col-6">
          <label htmlFor="created_at" className='labels'> تاریخ ثبت نام  </label>
          <input type="text" id="created_at" className="form-control inputs" value={date} readOnly>
          </input>
        </div>
      </div>
    </div>

  </div>;
}

export default BlankPage;
