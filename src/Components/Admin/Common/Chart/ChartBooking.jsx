import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { url } from 'Api/url';
import { urnChartMoneyBooking } from 'Api/urn';
import { getData } from 'Api/api';
import { Col, Row } from 'antd';

function ChartBooking(props) {
    const [dataMoneyBookingChart, setdataMoneyBookingChart] = useState([]);

    useEffect(() => {
        const uri = url + urnChartMoneyBooking;
        getData(uri)
        .then(res => {setdataMoneyBookingChart(res.data)});
    }, []);
    return (
        <>
            <Row>
                <Col xs={11} md={11} lg={11}>
                    <b>BOOKING CHART</b>
                </Col>
                <Col xs={2} md={2} lg={2} />
                <Col xs={11} md={11} lg={11}>
                    <b>BOOKING SERVICE CHART</b>
                </Col>
            </Row>
            <Row>
                <Col xs={11} md={11} lg={11}>
                    <Bar 
                        style={{ maxHeight: '35vh' }}
                        data={{
                            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                            datasets: [
                                {
                                    label: `Booking chart 2021`,
                                    data: dataMoneyBookingChart,
                                    backgroundColor: [
                                        'rgba(220, 20, 60, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(220, 20, 60, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />  
                </Col>
                <Col xs={2} md={2} lg={2} />
                <Col xs={11} md={11} lg={11}>
                    <Bar 
                        style={{ maxHeight: '35vh' }}
                        data={{
                            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                            datasets: [
                                {
                                    label: `Booking service chart 2021`,
                                    data: dataMoneyBookingChart,
                                    backgroundColor: [
                                        'rgba(220, 20, 60, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(220, 20, 60, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />  
                </Col>
            </Row>
            
        </>
    )
}

export default ChartBooking