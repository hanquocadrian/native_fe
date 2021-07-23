import React, { useEffect, useState } from 'react'
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { url } from 'Api/url';
import { urnChartNumberRoomTypeToBeBooked } from 'Api/urn';
import { postData } from 'Api/api';
import { PolarArea } from 'react-chartjs-2';

function ChartNumRTBooking(props) {
    const [year, setYear] = useState((new Date()).getFullYear());
    const [month, setMonth] = useState((new Date()).getMonth() + 1);
    const [isLoading, setIsLoading] = useState(false);

    const [rooms, setRooms] = useState([]);
    const [numbersBooked, setNumbersBooked] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        var uri = url + urnChartNumberRoomTypeToBeBooked;
        postData(uri,{month, year}).then(res => {
            console.log(res);
            setRooms(res.data.rooms);
            setNumbersBooked(res.data.numberRoomTypes);

            setIsLoading(false);
        })
    },[year, month])

    const onChange = (date, dateString) => {
        var chooseDate = new Date(dateString);
        setYear(chooseDate.getFullYear() || (new Date()).getFullYear());
        setMonth(chooseDate.getMonth() + 1 || (new Date()).getMonth() + 1);
    }

    return (
        <div style={{height: '90vh'}}>
            <Row className="mb-30 mt-30">
                <Col xs={20} md={20} lg={20}>
                    <h3 style={{ fontSize: '20px' }}><b>CHART ROOMTYPES TO BE BOOKING IN {month}/{year}</b></h3>
                </Col>
            {
                isLoading ? (
                    <Col xs={4} md={4} lg={4} style={{ textAlign: 'end'}}>
                        <DatePicker defaultValue={moment(new Date(), 'YYYY/MM')} onChange={ onChange } picker="month" disabled />
                    </Col>
                ) : (
                    <Col xs={4} md={4} lg={4} style={{ textAlign: 'end'}}>
                        <DatePicker defaultValue={moment(new Date(), 'YYYY/MM')} onChange={ onChange } picker="month" />
                    </Col>
                )
            }
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <PolarArea
                        style={{ maxHeight: '500px' }}
                        data={{
                            labels: rooms,
                            datasets: [
                                {
                                    label: 'Roomtypes to be booking',
                                    data: numbersBooked,
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
                                },
                            ],
                        }}
                    />  
                </Col>
            </Row>
        </div>
    )
}

export default ChartNumRTBooking

