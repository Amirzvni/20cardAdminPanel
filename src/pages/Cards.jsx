import React, { useState, useEffect } from 'react';
import moment from 'moment-jalaali';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./cards.css"
import { formatNumberWithoutComma, convertToPersianNumbers } from './numberUtils';
import { Link } from "react-router-dom";

function Cards() {
    const [id, setId] = useState(null);

    const tokenString = sessionStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const fetchData = async () => {
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
                setId(data)

            }).catch(err => console.log("err", err))

    }



    useEffect(() => {
        fetchData()
    }, [])
    const handleDivClick = (id) => {
        console.log("avsfebvsfed", id)
        window.location(`/${id}`);
    };
    console.log("id", id)
    if (!id) {
        return <div>Loading...</div>; // Or any other loading indicator or message
    }
    return <div>
        <div className="container">
            <div className="row">
                {id?.map((obj, index) => (
                    <Link to={`/cards/${obj.id}`} className='col-3 cardcont'>
                        <div key={index}>
                            {/* Render the object's data here */}
                            <p>{formatNumberWithoutComma(obj.cardID)}</p>
                            {/* <p>{obj.created_at}</p> */}
                            <p>{convertToPersianNumbers(moment(obj.created_at.slice(0, 10)).format('jYYYY/jMM/jDD'))}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>


    </div>;
}

export default Cards;
