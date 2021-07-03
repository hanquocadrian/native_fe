import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { url } from 'Api/url';
import { urnBillID } from 'Api/urn';
import { getData } from 'Api/api';
import { urnBillDetailsByIdBill } from 'Api/urn';
import { Col, Row, Table, Descriptions, Progress } from 'antd';
import { columns } from './moduleColumn';
import CurrencyFormat from 'react-currency-format';
import { format } from 'date-fns';
import BtnDeposit from '../ButtonPay/BtnDeposit';

function BillDetails(props) {
    const [bill, setBill] = useState(null);
    const [dataBillDetails, setDataBillDetails] = useState([]);
    const [isRefesh, setIsRefesh] = useState(false);

    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => setBill(res.data));
        
        uri = url + urnBillDetailsByIdBill(props.idPTT);
        getData(uri).then(res => setDataBillDetails(res.data));
    }, [props.idPTT]);

    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => setBill(res.data));
    },[isRefesh]);

    const onRefesh = (rf = false) => {
        // console.log("onRefesh", isRefesh);
        setIsRefesh(rf);
    }

    return (
        <div>
            { console.log(bill) }
            <Row style={{ fontFamily: 'Georgia' }}>
                <Col xs={4} md={4} lg={4}></Col>
                <Col xs={16} md={16} lg={16}><h1><b>THE INVOICE</b></h1></Col>
                <Col xs={4} md={4} lg={4}></Col>
            </Row>
            <Row className="mb-15">
                <Col xs={5} md={5} lg={5}></Col>
                <Col xs={14} md={14} lg={14}>
                    <Descriptions
                        // title={tenLP}
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                    >
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="ID bill">{ bill ? bill.idPTT : ''}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Booking">{ bill ? bill.idDDP : ''}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Date of issue">{ format(new Date(bill && bill.ngayThanhToan), 'dd/MM/yyyy') }</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Diff dates">{ bill ? bill.soDem : 0 } Night(s)</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Start date">{ format(new Date(bill && bill.ngayDen), 'dd/MM/yyyy') }</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{ format(new Date(bill && bill.ngayDi), 'dd/MM/yyyy')}</Descriptions.Item>
                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">
                            <Row>
                                <Col xs={20} md={20} lg={20}>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={ bill && (bill.tinhTrang == 1 ? 30 : (bill.tinhTrang == 2 ? 60 : 90)) }
                                        status="active"
                                        showInfo={false}
                                    />
                                </Col>
                                <Col xs={4} md={4} lg={4} style={{textAlign:'center'}}>
                                    { bill && (bill.tinhTrang == 1 ? 'Unpaid' : bill.tinhTrang == 2 ? 'Deposited' : 'Paid') } 
                                </Col>
                            </Row>
                        
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={5} md={5} lg={5}></Col>
            </Row>
            <Row style={{ fontFamily: 'Georgia' }}>
                <Col xs={4} md={4} lg={4}></Col>
                <Col xs={16} md={16} lg={16}><h1><b>DETAIL INVOICE</b></h1></Col>
                <Col xs={4} md={4} lg={4}></Col>
            </Row>
            <Row className="mb-30">
                <Col xs={5} md={5} lg={5} />
                <Col xs={14} md={14} lg={14}>
                    <Table 
                        columns={ columns }
                        dataSource={ dataBillDetails }
                        pagination={{ pageSize: 5, position: ['topRight', 'none'] }} 
                        bordered
                        scroll={{ x: 350 }}
                        footer={() => 
                            <>

                                <Row>
                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Night(s): </Col>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={4} md={4} lg={4}>
                                        {bill ? bill.soDem : 0}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost rooms: </Col>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={4} md={4} lg={4}>
                                        <CurrencyFormat value={bill ? bill.tongThanhTien : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Deposit 30%: </Col>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={4} md={4} lg={4}>
                                        <CurrencyFormat value={bill ? bill.tienCoc : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Off sale: </Col>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={4} md={4} lg={4}>
                                        {bill ? bill.phanTramGiam : 0}%
                                    </Col>
                                </Row>
                                <hr />

                                <Row>
                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total cost: </Col>
                                    <Col xs={2} md={2} lg={2} />
                                    <Col xs={4} md={4} lg={4}>
                                        <CurrencyFormat value={bill ? bill.tienConLai : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </Col>
                                </Row>
                            </>
                        }
                    />

                </Col>
                <Col xs={5} md={5} lg={5} />
            </Row>
            <Row className="mb-30">
                <Col xs={5} md={5} lg={5} />
                <Col xs={14} md={14} lg={14} style={{ textAlign:'center' }}>
                    { 
                        bill && bill.tinhTrang == 1 && (
                            <BtnDeposit bill={bill} onRefesh={onRefesh} />
                        ) 
                    }
                    {
                        bill && bill.tinhTrang == 2 && (
                            <>
                                <b><i>Wait pay at hotel</i></b>
                            </>
                        )
                    }
                </Col>
                <Col xs={5} md={5} lg={5} />
            </Row>
        </div>
    )
}

BillDetails.propTypes = {
    idPTT: PropTypes.string.isRequired
}

export default BillDetails

