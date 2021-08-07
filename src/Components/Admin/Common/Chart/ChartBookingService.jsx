import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { url } from 'Api/url';
// import { urnChartMoneyBooking } from 'Api/urn';
import { getData } from 'Api/api';
import { Col, Row } from 'antd';
import { urnChartMoneyBookingService } from 'Api/urn';

function ChartBookingService(props) {    
    const year = (new Date()).getFullYear();
    const [dataMoneyBookingServiceChart, setdataMoneyBookingServiceChart] = useState([]);

    useEffect(() => {
        var uri = url + urnChartMoneyBookingService;
        getData(uri)
        .then(res => {console.log("service: ", res.data);setdataMoneyBookingServiceChart(res.data)});
    }, []);

    return (
        <div style={{height: '90vh'}}>
            <Row className="pb-50 pt-50">
                <Col xs={24} md={24} lg={24}>
                    <h3 style={{ fontSize: '28px' }}><b>BOOKING SERVICES CHART {year}</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Bar
                        data={{
                            labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                            datasets: [
                                {
                                    label: `Booking service`,
                                    data: [0,0,200,0],
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
            
        </div>
    )
}

export default ChartBookingService

