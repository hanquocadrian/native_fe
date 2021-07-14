import React, { useEffect, useState } from 'react'
import { url } from 'Api/url';
import { urnBillID, urnKhdID } from 'Api/urn';
import { getData } from 'Api/api';
import { urnBillDetailsByIdBill } from 'Api/urn';
import { Col, Row, Table, Descriptions, Progress, Button, Tooltip, notification } from 'antd';
import CurrencyFormat from 'react-currency-format';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { urnChangeStatusToPaidBill } from 'Api/urn';

function BillDetail(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [bill, setBill] = useState(null);
    const [dataBillDetails, setDataBillDetails] = useState([]);
    const [dataKHD, setDataKHD] = useState(null);

    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => {
            setBill(res.data);
            uri = url + urnKhdID(res.data.idKHD);
            getData(uri).then(res => setDataKHD(res.data[0]));
        });
    },[props.idPTT]);

    useEffect(() => {
        var uri = url + urnBillDetailsByIdBill(props.idPTT);
        getData(uri).then(res =>{ console.log("load:", res.data); setDataBillDetails(res.data); });
    }, [props.idPTT]);

    const columns = [
        {
            title: 'ROOM',
            dataIndex: 'maPhong',
            align: 'center',
            width: 150
        },
        {
            title: 'AMOUNT',
            dataIndex: 'donGia',
            render: donGia => (
                <>
                    <CurrencyFormat value={donGia} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </>
            ),
            align: 'center',
            width: 300
        }
    ];

    const onCheckout = () => {
        if(bill.tinhTrang === 1) {
            return notification.warning({
                message: `Can't checkout`,
                description:
                  `This bill must be deposited by Customer before checkout`,
                duration: 0,
              });
        }
        //Chuyển hướng đến tạo PTP
        var uri = url + urnChangeStatusToPaidBill(bill.idPTT);
        getData(uri).then((res) => {
            return props.propsParent.history.push('/admin/bill/');
        });
    }

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row >
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Link to="/admin/bill/">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>BILL DETAIL</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <div style={{height: '80vh', overflow: "scroll"}}>
                        <>
                            <Row style={{ fontFamily: 'Georgia' }}>
                                <Col xs={4} md={4} lg={4}></Col>
                                <Col xs={16} md={16} lg={16}><h1><b>THE INVOICE</b></h1></Col>
                                <Col xs={4} md={4} lg={4}></Col>
                            </Row>
                            <Row className="mb-15">
                                <Col xs={2} md={2} lg={2}></Col>
                                <Col xs={20} md={20} lg={20}>
                                    <Descriptions
                                        bordered
                                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                                    >
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px'}} label="ID bill">{ bill && (bill.idPTT || 'Non') }</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Booking">{ bill && (bill.idDDP || 'Non')}</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID off sale">{ bill && (bill.idKM || 'Non')}</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Customer">{ dataKHD && (dataKHD.tenKH || 'Non') }</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Date of issue">{ format(new Date(bill && bill.ngayThanhToan), 'dd/MM/yyyy') }</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Diff dates">{ bill && (bill.soDem || 0)} Night(s)</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Start date">{ format(new Date(bill && bill.ngayDen), 'dd/MM/yyyy') }</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{ format(new Date(bill && bill.ngayDi), 'dd/MM/yyyy')}</Descriptions.Item>
                                        <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">
                                            <Row>
                                                <Col xs={10} md={14} lg={20}>
                                                    <Progress
                                                        strokeColor={{
                                                            '0%': '#108ee9',
                                                            '100%': '#87d068',
                                                        }}
                                                        percent={ bill && (bill.tinhTrang === 1 ? 30 : (bill.tinhTrang === 2 ? 60 : 100)) }
                                                        status="active"
                                                        showInfo={false}
                                                    />
                                                </Col>
                                                <Col xs={14} md={10} lg={4} style={{textAlign:'center'}}>
                                                    { bill && (bill.tinhTrang === 1 ? 'Unpaid' : bill.tinhTrang === 2 ? 'Deposited' : 'Paid') } 
                                                </Col>
                                            </Row>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col xs={2} md={2} lg={2}></Col>
                            </Row>
                            <Row style={{ fontFamily: 'Georgia' }}>
                                <Col xs={4} md={4} lg={4}></Col>
                                <Col xs={16} md={16} lg={16}><h1><b>DETAIL INVOICE</b></h1></Col>
                                <Col xs={4} md={4} lg={4}></Col>
                            </Row>
                            <Row className="mb-30">
                                <Col xs={2} md={2} lg={2} />
                                <Col xs={20} md={20} lg={20}>
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
                                <Col xs={2} md={2} lg={2} />
                            </Row>
                            {
                                phanQuyen === 3 && (
                                    <>
                                        <Row className="mb-30">
                                            <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                                <Button className="btn-create" onClick={ onCheckout }>CHECKOUT</Button>
                                            </Col>
                                        </Row>
                                    </>
                                )
                            }
                            
                        </>
                    </div>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}

export default BillDetail

