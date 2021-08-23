import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { url } from 'Api/url';
import { urnChartCusStayIn7N1Nationals } from 'Api/urn';
import { getData } from 'Api/api';
import { Bar, Radar } from 'react-chartjs-2';

export default function ChartCusStay(props) {
    const [nationals, setNationals] = useState([]);
    const [numberCusStay, setNumberCusStay] = useState([]);

    useEffect(() => {
        var uri = url + urnChartCusStayIn7N1Nationals;
        getData(uri).then(res => {
            console.log("national: ", res);
            setNationals(res.data.nationals);
            setNumberCusStay(res.data.numberCusStay);
        })
    },[])
      
    
    return (
        <div style={{height: '90vh'}}>
            <Row className="pb-50 pt-50" style={{lineHeight: '28px'}}>
                <Col xs={20} md={20} lg={20}>
                    <h3 style={{ fontSize: '28px' }}><b>CHART NUMBER CUSTOMER STAY IN NATIONALS</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Radar
                        style={{ maxHeight: '500px' }}
                        data={{
                            labels: nationals,
                            datasets: [
                                {
                                    label: `Number customer stay in nationals`,
                                    data: numberCusStay,
                                    backgroundColor: 'rgba(220, 20, 60, 0.2)',
                                    borderColor: 'rgb(220, 20, 60)',
                                    pointBackgroundColor: 'rgb(220, 20, 60)',
                                    borderWidth: 1,
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                                }
                            ],
                        }}
                    />  
                    {/* <Bar
                        style={{ maxHeight: '500px' }}
                        data={{
                            labels: nationals,
                            datasets: [
                                {
                                    label: `Number customer stay in nationals`,
                                    data: numberCusStay,
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
                                }
                            ],
                        }}
                    />   */}
                </Col>
            </Row>
        </div>
    )
}
