import React, { useState, useEffect } from "react"
import "./customChart.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { formatNumber, formatNumberWithoutComma } from './numberUtils';


const data = [
    { name: 'فروردین', value: 10 },
    { name: 'اردیبهشت', value: 15 },
    { name: 'خرداد', value: 7 },
    { name: 'تیر', value: 20 },
    { name: 'مرداد', value: 12 },
    { name: 'شهریور', value: 2 },
    { name: 'مهر', value: 12 },
    { name: 'آبان', value: 12 },
    { name: 'آذر', value: 12 },
    { name: 'دی', value: 12 },
    { name: 'بهمن', value: 12 },
    { name: 'اسفند', value: 120 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const formattedValue = formatNumber(data.value); // Format the value using formatNumber

        return (
            <div className="custom-tooltip">
                <p className="label">{data.name}</p>
                <p className="toltipEx">: هزینه </p>
                <p>{formattedValue}</p> {/* Use the formatted value */}
            </div>
        );
    }

    return null;
};

const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const formattedValue = formatNumber(payload.value);

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
                {formattedValue}
            </text>
        </g>
    );
};


const CustomChart = () => {

    const tokenString = sessionStorage.getItem('token');
    const token = JSON.parse(tokenString);
    console.log("token in chart", token)
    const [month, setMonth] = useState();
    const [chart, setChart] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [ChartWid, setChartWid] = useState("");
    const fetchData = async () => {
        const apiUrl = process.env.BASE_URL
        fetch(`${process.env.REACT_APP_BASE_URL}/user/chart`, {
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
                console.log("reeeeeeee", data)
                // setMonth(data)

                const monthMapping = {

                    Mar: 'فروردین',
                    Apr: 'اردیبهشت',
                    May: 'خرداد',
                    Jun: 'تیر',
                    Jul: 'مرداد',
                    Aug: 'شهریور',
                    Sep: 'مهر',
                    Oct: 'آبان',
                    Nov: "آذر",
                    Dec: "دی",
                    Jan: 'بهمن',
                    Feb: 'اسفند'
                };

                const chartData = Object.entries(data).map(([name, value]) => ({ name: monthMapping[name], value }));
                // const chartData = Object.entries(data).map(([name, value]) => ({
                //     name: monthMapping[name],
                //     value: formatNumber(value),
                // }));

                const startIndex = Object.keys(monthMapping).findIndex(month => month === 'Mar');
                const endIndex = Object.keys(monthMapping).length - 1;
                setStart(startIndex)
                setEnd(endIndex)
                setChart(chartData)

            }).catch(err => console.log("err", err))

    }
    useEffect(() => {
        fetchData()
        const handleResize = () => {
            const screenWid = window.innerWidth * 0.8
            console.log("wtf" , screenWid);
            setChartWid(screenWid)
        }
        handleResize()
        window.addEventListener("resize" , handleResize)
        return () => {
            window.removeEventListener("resize" , handleResize)
        }
    }, [])

    console.log("monthhhh", ChartWid)

    return (
        <div style={{ width: `${ChartWid}px`, margin: '0 auto'  }} className="d-flex flex-column align-items-center">
            <div style={{ width: '100%' , height : "400px"}}>
                <BarChart width={ChartWid} height={400} data={chart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tick={<CustomYAxisTick />} />
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="value" fill="#8884d8" barSize={10} />

                </BarChart>
            </div>
        </div>
    )
}
export default CustomChart