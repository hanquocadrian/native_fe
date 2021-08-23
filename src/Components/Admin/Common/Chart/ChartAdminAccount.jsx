import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { url } from 'Api/url';
import { urnChartNumberOfAdminAccount } from 'Api/urn';
import { getData } from 'Api/api';
import { Doughnut } from 'react-chartjs-2';

export default function ChartAdminAccount(props) {
    const [adminAccounts, setAdminAccounts] = useState([]);
    const [numberAdminAcc, setNumberAdminAcc] = useState([]);

    useEffect(() => {
        var uri = url + urnChartNumberOfAdminAccount;
        getData(uri).then(res => {
            console.log("adminAccount: ", res);
            setAdminAccounts(res.data.adminAccounts);
            setNumberAdminAcc(res.data.numberAdminAcc);
        })
    },[])
      
    return (
        <div style={{height: '90vh'}}>
            <Row className="pb-50 pt-50" style={{lineHeight: '28px'}}>
                <Col xs={20} md={20} lg={20}>
                    <h3 style={{ fontSize: '28px' }}><b>CHART NUMBER OF ADMIN ACCOUNT</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <Doughnut
                        style={{ maxHeight: '500px' }}
                        data={{
                            labels: adminAccounts,
                            datasets: [
                                {
                                    label: `Number of admin account`,
                                    data: numberAdminAcc,
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
