import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { url } from 'Api/url';
import { urnChartNumberOfNativeHotelAccount } from 'Api/urn';
import { getData } from 'Api/api';
import { Pie } from 'react-chartjs-2';

export default function ChartNativeAccount(props) {
    const [typeOfAccounts, setTypeOfAccounts] = useState([]);
    const [numberTypeOfAcc, setNumberTypeOfAcc] = useState([]);

    useEffect(() => {
        var uri = url + urnChartNumberOfNativeHotelAccount;
        getData(uri).then(res => {
            console.log("adminAccount: ", res);
            setTypeOfAccounts(res.data.typeOfAccounts);
            setNumberTypeOfAcc(res.data.numberTypeOfAcc);
        })
    },[])
      
    return (
        <div style={{height: '90vh'}}>
            <Row className="pb-50 pt-50" style={{lineHeight: '28px'}}>
                <Col xs={20} md={20} lg={20}>
                    <h3 style={{ fontSize: '28px' }}><b>CHART NUMBER OF NATIVE ACCOUNT</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Pie
                        style={{ maxHeight: '500px' }}
                        data={{
                            labels: typeOfAccounts,
                            datasets: [
                                {
                                    label: `Number of Native hotel account`,
                                    data: numberTypeOfAcc,
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    hoverOffset: 4
                                }
                            ],
                        }}
                    />  
                </Col>
            </Row>
        </div>
    )
}
