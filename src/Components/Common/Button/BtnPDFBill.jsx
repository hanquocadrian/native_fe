import React, { createRef } from 'react'
import ReactToPdf from 'react-to-pdf'
import { Col, Row, Table, Descriptions, Progress, Button } from 'antd';
import { columns } from '../BillDetails/moduleColumn';
import CurrencyFormat from 'react-currency-format';
import { format } from 'date-fns';
import './BtnPDF.css';
import { useSelector } from 'react-redux';

function BtnPDFBill(props) {
    const displayName = useSelector(state => state.customerAccountReducer.displayName);
    const email = useSelector(state => state.customerAccountReducer.email);
    const bill = props.bill;
    const dataBillDetails = props.dataBillDetails;

    const ref = createRef();

    const options = {
        format: 'a2'
    };

    return (
        <>
            <Row style={{ fontFamily: 'Georgia' }}>
                <Col xs={4} md={4} lg={4}></Col>
                <Col xs={16} md={16} lg={16}>
                    <Row>
                        <Col xs={24} md={24} lg={24}><h1><b>PREVIEW EXPORT PDF</b></h1></Col>
                    </Row>
                </Col>
                <Col xs={4} md={4} lg={4}></Col>
            </Row>
            <div ref={ref}>
                <Row style={{ fontFamily: 'Georgia' }}>
                    <Col xs={4} md={4} lg={4}></Col>
                    <Col xs={16} md={16} lg={16}>
                                <header class="clearfix">
                        <Row>
                            <Col xs={24} md={10} lg={10}>
                                {/* <header class="clearfix"> */}
                                    <div id="details" class="clearfix">
                                        <div id="client">
                                            <div class="to">INVOICE TO:</div>
                                            <h2 class="name">{ displayName }</h2>
                                            <div class="email"><a href={"mailto:" + email }>{ email }</a></div>
                                        </div>
                                    </div>
                                {/* </header> */}
                            </Col>
                            <Col xs={24} md={4} lg={4} style={{ textAlign:'center' }} id="logo">
                                <img src="/assets/images/NativeLogo.png" alt="logo" />
                                <h2 class="name">Native Hotel</h2>
                            </Col>
                            <Col xs={24} md={10} lg={10}>
                                {/* <header class="clearfix"> */}
                                    <div id="company">
                                        <div class="to">CONTACT TO:</div>
                                        <div>Longcroft House, 2-8 Victoria Avenue, London EC2M 4NS</div>
                                        <div>(602) 519-0450</div>
                                        <div><a href="mailto:nativecityhotel@outlook.com.vn">nativecityhotel@outlook.com.vn</a></div>
                                    </div>
                                {/* </header> */}
                            </Col>
                        </Row>
                                </header>
                        
                    </Col>
                    <Col xs={4} md={4} lg={4}></Col>
                </Row>
                <Row style={{ fontFamily: 'Georgia' }}>
                    <Col xs={4} md={4} lg={4}></Col>
                    <Col xs={16} md={16} lg={16}>
                        <Row>
                            <Col xs={24} md={24} lg={24}><h1><b>THE INVOICE</b></h1></Col>
                        </Row>
                    </Col>
                    <Col xs={4} md={4} lg={4}></Col>
                </Row>
                <Row className="mb-15">
                    <Col xs={5} md={5} lg={5}></Col>
                    <Col xs={14} md={14} lg={14}>
                        <Descriptions
                            bordered
                            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        >
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px'}} label="ID bill">{ bill && (bill.idPTT || 'Non') }</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Booking">{ bill && (bill.idDDP || 'Non')}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID off sale">{ bill && (bill.idKM || 'Non')}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Card">{ bill && (bill.idThe || 'Non')}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Date of issue">{ format(new Date(bill && bill.ngayThanhToan), 'dd/MM/yyyy') }</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Diff dates">{ bill && (bill.soDem || 0)} Night(s)</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Start date">{ format(new Date(bill && bill.ngayDen), 'dd/MM/yyyy') }</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{ format(new Date(bill && bill.ngayDi), 'dd/MM/yyyy')}</Descriptions.Item>
                            <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">
                                <Row>
                                    <Col xs={10} md={0} lg={0}>
                                        <Progress percent={75} steps={3} showInfo={false} />
                                    </Col>
                                    <Col xs={0} md={14} lg={20}>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            percent={ bill && (bill.tinhTrang === 1 ? 30 : (bill.tinhTrang === 2 ? 60 : 90)) }
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
            </div>
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options}>
                        {({toPdf}) => (
                            <Button onClick={toPdf}>Create PDF</Button>
                        )}
                    </ReactToPdf>
                </Col>
            </Row>
            
        </>
    )
}

export default BtnPDFBill

