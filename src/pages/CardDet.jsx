import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-jalaali';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cards.css"
import { formatNumberWithoutComma, convertToPersianNumbers, formatNumber } from './numberUtils';
import { useParams } from 'react-router-dom';
import MyModalErr from './MyModalErr'
import Filter from './Filter'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

import { Icon } from "@iconify/react";

const PAGE_SIZE = 20;

function CardDet() {
    const [tableData, setTableData] = useState(null);
    const [card, setCard] = useState(null);
    const [scard, setScard] = useState(null);
    const params = useParams();
    console.log("params", params.cardid);
    const tokenString = sessionStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const [sortAmount, setSortAmount] = useState("more_amount");
    const [sortDate, setSortDate] = useState("new");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(2);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [filter, setFilterShow] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalContentRef = useRef(null);
    const [submittedDate, setSubmittedDate] = useState();
    const [value, setValue] = useState();
    const [value1, setValue1] = useState();
    const [filterStatus, setFilterStatus] = useState();
    const [filterName, setFilterName] = useState();
    const ddddd = value?.toDate?.()
    const ddddd1 = value1?.toDate?.()
    console.log("sdjnhosjfsdjsdvnksdvs", ddddd)
    console.log("sdjnhosjfsdjsdvnksdvs", ddddd1)
    // value?.toDate?.().toString()

    async function handleAmountSort() {

        console.log("lets hanlde sort our way")
        if (sortAmount == null) {
            setSortAmount("more_amount")
            console.log("its null so setted :", sortAmount)
        } else if (sortAmount == "more_amount") {
            setSortAmount("less_amount")
            console.log("its more so setted :", sortAmount)
        } else if (sortAmount == "less_amount") {
            setSortAmount("more_amount")
            console.log("its less so setted :", sortAmount)
        }
        const req = { sort: sortAmount }
        const reqF = JSON.stringify(req)
        console.log("reqfff", reqF)
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/filter-card/${params.cardid}?page=${currentPage}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: reqF

        }).then(async res => {
            if (res.status == 200) {
                const resp = await res.json();
                console.log("response token is3652346354", resp.data.transactions);
                setTableData(resp.data.transactions)


            }
            else {
                setModalShow1(true)
            }
        })



    }
    async function handleDateSort() {

        console.log("lets hanlde sort our way")
        if (sortDate == null) {
            setSortDate("new")
            console.log("its null so setted :", sortDate)
        } else if (sortDate === "new") {
            setSortDate("old")
            console.log("its old so setted :", sortDate)
        } else if (sortDate == "old") {
            setSortDate("new")
            console.log("its new so setted :", sortDate)
        }
        const req = { sort: sortDate }
        const reqF = JSON.stringify(req)
        console.log("reqfff", reqF)
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/filter-card/${params.cardid}?page=${currentPage}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: reqF

        }).then(async res => {
            if (res.status == 200) {
                const resp = await res.json();
                console.log("response token is", resp.data.transactions);
                setTableData(resp.data.transactions)


            }
            else {
                setModalShow1(true)
            }
        })



    }
    async function handleFilterSubmit(e) {
        e.preventDefault();
        console.log("Let's handle filtering our way");

        const from = ddddd ? JSON.stringify(ddddd).slice(1, 11) : null;
        const to = ddddd1 ? JSON.stringify(ddddd1).slice(1, 11) : null;

        console.log("from from from", from);
        console.log("to to to", to);

        const req = {
            status: filterStatus,
            filter: {
                merchant: filterName,
                from_date: from,
                to_date: to,
            },
        };

        const reqF = JSON.stringify(req);
        console.log("reqfff", reqF);
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/filter-card/${params.cardid}?page=${currentPage}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: reqF

        }).then(async res => {
            if (res.status == 200) {
                const resp = await res.json();
                console.log("filter response is", resp);
                setTableData(resp.data.transactions)


            }
            else {
                setModalShow1(true)
            }
        })



    }







    const fetchData = async () => {
        const apiUrl = process.env.BASE_URL
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/filter-card/${params.cardid}?page=${currentPage}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                console.log("object", response);
                const { data } = await response.json();
                console.log("init table", data)
                setTableData(data.transactions)
                setCurrentPage(data.paginate.currentPage)
                setTotalPage(data.paginate.totalPages)

            }).catch(err => console.log("err", err))

    }

    const fetchData1 = async () => {
        const apiUrl = process.env.BASE_URL
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/list-user-card`, {
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
                setCard(data)
                const object49 = data.find(obj => obj.id = params.cardid);
                console.log("599r9", object49)
                setScard(object49)

            }).catch(err => console.log("err", err))

    }


    const renderStatusBadge = (status) => {
        if (status === 'active') {
            return <span className=""> فعال </span>;
        } else if (status === 'suspend') {
            return <span className="">معلق</span>;
        } else if (status === 'passive') {
            return <span className="">غیر فعال</span>;
        }
    }

    const renderStatusBadge1 = (status) => {
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

    useEffect(() => {

        fetchData();
        fetchData1();
    }, [currentPage]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const handleNextPage = () => {
        const next = currentPage + 1
        console.log("next :", next)
        setCurrentPage(next)
    };

    const handlePreviousPage = () => {
        const pre = currentPage - 1
        console.log("pre :", pre)
        setCurrentPage(pre)
    };

    const handleFirstPage = () => {
        setCurrentPage(1)
    }
    const handleLastPage = () => {
        setCurrentPage(totalPage)
    }
    const toggleModal = (event) => {
        if (isOpen) {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                setIsClosing(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setIsClosing(false);
                }, 500); // Same duration as the closing animation
            }
        } else {
            setIsOpen(true);
        }
    };



    console.log("iddataaaaaa", scard)
    console.log("data in id is :", tableData)
    console.log("submit date", value)
    console.log("filter status", filterStatus)
    console.log("filter name", filterName)
    if (!scard) {
        return <div>Loading...</div>; // Or any other loading indicator or message
    }
    if (!tableData) {
        return <div>Loading...</div>;
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col cardDet'>
                    <p>شماره کارت :</p>
                    <p>{formatNumberWithoutComma(scard.cardID)}</p>
                </div>
                <div className='col cardDet'>
                    <p>موجودی :</p>
                    <p> {formatNumber(scard.wallet)} </p>
                </div>
                <div className='col cardDet'>
                    <p>تاریخ صدور :</p>
                    <p> {convertToPersianNumbers(moment(scard.created_at.slice(0, 10)).format('jYYYY/jMM/jDD'))} </p>
                </div>
                <div className='col cardDet'>
                    <p>وضعیت</p>
                    <p> {renderStatusBadge(scard.status)} </p>
                </div>
            </div>
            <br />
            <div>
                <button className='btn btn-success' onClick={toggleModal} >فیلتر</button>
                <div>
                    {isOpen && (
                        <div className="modal-overlay" onClick={toggleModal}>
                            <div className={`modal-content ${isClosing ? 'closing' : ''}`} ref={modalContentRef}>
                                {/* <button className="modal-close" onClick={toggleModal}>
                                    Close
                                </button> */}
                                <div className="modal-body">

                                    <div className="container mt-5">
                                        <form onSubmit={handleFilterSubmit}>
                                            <div className="form-group mb-2">
                                                <label htmlFor="statusSelect"> وضعیت : </label>
                                                <select className="form-control" id="statusSelect" onChange={(e) => setFilterStatus(e.target.value)}>
                                                    <option value={""}></option>
                                                    <option value={"submit"}>در حال انجام</option>
                                                    <option value={"finish"}>موفق</option>
                                                    <option value={"revers"}>ناموفق</option>
                                                    <option value={"credit_increase"}>افزایش اعتبار</option>
                                                    <option value={"credit_decrease"}>کاهش اعتبار</option>
                                                </select>
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="nameInput"> نام پذیرنده : </label>
                                                <input type="text" className="form-control" id="nameInput" onChange={(e) => setFilterName(e.target.value)} />
                                            </div>

                                            <label htmlFor='azz' >تاریخ :</label>


                                            <div class="input-group mb-1">

                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="basic-addon2">از</span>
                                                </div>
                                                {/* <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" id='azz' /> */}
                                                <DatePicker
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    calendarPosition="bottom-right"
                                                    inputClass='form-control datepick'
                                                    aria-describedby="basic-addon2" id='azz'
                                                    value={value} onChange={setValue}
                                                />

                                            </div>
                                            <div class="input-group mb-3">
                                                <div class="input-group-append">
                                                    <span class="input-group-text" id="basic-addon2">تا</span>
                                                </div>
                                                {/* <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" /> */}

                                                <DatePicker
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    calendarPosition="bottom-right"
                                                    inputClass='form-control datepick'
                                                    aria-describedby="basic-addon2"
                                                    value={value1} onChange={setValue1}
                                                />

                                            </div>

                                            <button type="submit" className="btn btn-primary">اعمال فیلتر</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <br />
            <div className='cardTable'>
                <div className="">
                    <table className="table table-responsive">
                        <thead className='tableHead'>
                            <tr>
                                <th className='tableHead'>ID</th>
                                <th className='tableHead'>پذیرنده</th>
                                <th className='tableHead tableSortable' onClick={handleAmountSort}>
                                    مبلغ
                                    <Icon icon={"akar-icons:chevron-down"} width="15" />
                                </th>
                                <th className='tableHead'> نوع </th>
                                <th className='tableHead'>وضعیت</th>
                                <th className='tableHead tableSortable' onClick={handleDateSort} >
                                    تاریخ
                                    <Icon icon={"akar-icons:chevron-down"} width="15" />
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr key={item.id}>
                                    <td>{formatNumberWithoutComma(item.id)}</td>
                                    <td>{item.info}</td>
                                    <td>{formatNumber(item.amount)}</td>
                                    <td>{renderTypePaymentBadge(item.type_payment)}</td>
                                    <td>{renderStatusBadge1(item.status)}</td>
                                    <td>{convertToPersianNumbers(moment(item.created_at.slice(0, 10)).format('jYYYY/jMM/jDD'))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <div>
                        {/* Render your data */}

                        {/* Pagination controls */}
                        <div style={{ textAlign: 'left' }}>
                            {/* {currentPage === 1 ? (
                                <div>
                                    <button className='btn btn-primary' onClick={handleNextPage}>بعدی</button>
                                </div>
                            ) : currentPage < totalPage ? (
                                <div>
                                    <button className='btn btn-primary m-2' onClick={handlePreviousPage}>قبلی</button>
                                    <button className='btn btn-primary' onClick={handleNextPage}>بعدی</button>
                                </div>
                            ) : (
                                <div>
                                    <button className='btn btn-primary' onClick={handlePreviousPage}>قبلی</button>
                                </div>
                            )} */}

                            <div>
                                <button className='btn' onClick={handleFirstPage}><Icon icon={"jam:chevrons-right"} width="17" /></button>
                                <button className='btn' onClick={handlePreviousPage}><Icon icon={"jam:chevron-right"} width="17" /></button>
                                <span>
                                    {/* {currentPage} */}
                                    {currentPage > 2 && (
                                        <>
                                            <button className='btn' onClick={() => setCurrentPage(1)}>1</button>
                                            {currentPage > 3 && <span>...</span>}
                                        </>
                                    )}

                                    {currentPage > 1 && (
                                        <button className='btn' onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>
                                    )}

                                    <button className='btn' style={{
                                        fontWeight: 'bold',
                                        color: '#ff0000', /* Bright red color */
                                        textShadow: '0px 0px 2px #ff0000'
                                    }}>{currentPage}</button>

                                    {currentPage < totalPage && (
                                        <button className='btn' onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
                                    )}

                                    {currentPage < totalPage - 1 && (
                                        <>
                                            {currentPage < totalPage - 2 && <span>...</span>}
                                            <button className='btn' onClick={() => setCurrentPage(totalPage)}>{totalPage}</button>
                                        </>
                                    )}
                                </span>
                                <button className='btn' onClick={handleNextPage}><Icon icon={"jam:chevron-left"} width="17" /></button>
                                <button className='btn' onClick={handleLastPage}><Icon icon={"jam:chevrons-left"} width="17" /></button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardDet;
