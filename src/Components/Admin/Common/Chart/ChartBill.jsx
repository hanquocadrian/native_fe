import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { url } from 'Api/url';
import { urnChartMoneyBooking } from 'Api/urn';
import { getData } from 'Api/api';
import { Col, Row } from 'antd';

function ChartBill(props) {
    const [dataMoneyBookingChart, setdataMoneyBookingChart] = useState([]);

    useEffect(() => {
        const uri = url + urnChartMoneyBooking;
        getData(uri)
        .then(res => {setdataMoneyBookingChart(res.data)});
    }, []);
    return (
        <>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <b>BILL CHART</b>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Line 
                        style={{ maxHeight: '35vh' }}
                        data={{
                            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                            datasets: [
                                {
                                    label: 'Bill chart 2021',
                                    data: dataMoneyBookingChart,
                                    backgroundColor: 'rgba(220, 20, 60, 0.2)',
                                    borderColor: 'rgba(220, 20, 60, 1)',
                                },
                            ],
                        }}
                    />  
                </Col>
            </Row>
            
        </>
    )
}

export default ChartBill