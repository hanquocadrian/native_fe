import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { url } from 'Api/url';
import { getData } from 'Api/api';
import { Col, Row } from 'antd';
import { urnChartMoneyBillMonths } from 'Api/urn';

function ChartBill(props) {
    const year = (new Date()).getFullYear();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [dataMoneyBillChart, setDataMoneyBillChart] = useState([]);

    useEffect(() => {
        const uri = url + urnChartMoneyBillMonths;
        getData(uri)
        .then(res => setDataMoneyBillChart(res.data));
    }, []);

    return (
        <div style={{height: '90vh'}}>
            <Row className="pb-30 mt-50">
                <Col xs={24} md={24} lg={24}>
                    <h3 style={{ fontSize: '28px'}}><b>BILL CHART {year}</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Line
                        data={{
                            labels: month,
                            datasets: [
                                {
                                    label: 'Bill chart 2021',
                                    data: dataMoneyBillChart,
                                    backgroundColor: 'rgba(220, 20, 60, 0.2)',
                                    borderColor: 'rgba(220, 20, 60, 1)',
                                },
                            ],
                        }}
                    />  
                </Col>
            </Row>
        </div>
    )
}

export default ChartBill