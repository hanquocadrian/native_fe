import React, { useEffect, useState } from 'react'
import { url } from 'Api/url';
import { urnBillID, urnKhdID, urnBookingDetailsByIdBooking, urnBillDetailsByIdBill, urnRoomsByDatesIdRoomTypeNumber, urnBillAdminCancel, urnExtraFeeByIDPTT, urnSurchargePrice, urnExtraFeeID, urnSaleOffByCost, urnBillUpdateMoneyInBill } from 'Api/urn';
import { getData, postData, deleteData, putData } from 'Api/api';
import { Col, Row, Table, Descriptions, Progress, Button, Tooltip, Spin, message, notification, Popconfirm } from 'antd';
import CurrencyFormat from 'react-currency-format';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useSelector } from 'react-redux';
import BtnDeposit from 'Components/Admin/Common/Button/BtnDeposit';
import BtnCheckout from '../../Button/BtnCheckout';
import SurchargeAdd from 'Components/Admin/Common/Surcharge/SurchargeAdd';
import SurchargeUpd from 'Components/Admin/Common/Surcharge/SurchargeUpd';
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ExtraFees(props) {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);
    const [bill, setBill] = useState(null);
    const [dataBillDetails, setDataBillDetails] = useState([]);
    const [dataKHD, setDataKHD] = useState(null);
    const [dataExtraFees, setDataExtraFees] = useState([]);
    const [dataGiaPT, setDataGiaPT] = useState([]);
    const [totalSurcharge, setTotalSurcharge] = useState(0);

    const [isClickDeposit, setIsClickDeposit] = useState(false);
    const [isClickCheckout, setIsClickCheckout] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefesh, setIsRefesh] = useState(false);

    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => {
            setBill(res.data);
            uri = url + urnKhdID(res.data.idKHD);
            getData(uri).then(res => setDataKHD(res.data[0]));
        });
    },[props.idPTT, isRefesh]);

    useEffect(() => {
        var uri = url + urnBillDetailsByIdBill(props.idPTT);
        getData(uri).then(res =>{ console.log("load:", res.data); setDataBillDetails(res.data); });
    }, [props.idPTT]);

    useEffect(() => {
        var tpt = 0;
        var uri = url + urnExtraFeeByIDPTT(props.idPTT);
        getData(uri)
        .then(res =>{ 
            console.log("loadidPTT:", res.data); 
            setDataExtraFees(res.data); 
            res.data.map(item => {
                tpt += (item.soLuong * item.donGia);
            });
            console.log("tpt:", tpt); 
            setTotalSurcharge(tpt);
        });
    }, [props.idPTT, isRefesh]);

    useEffect(() => {
        var uri = url + urnSurchargePrice;
        getData(uri).then(res =>{ console.log("load:", res.data); setDataGiaPT(res.data); });
    }, []);

    const columns1 = [
        {
            title: '#',
            dataIndex: 'idPT',
            align: 'center',
            width: 50
        },
        {
            title: 'SURCHARGE NAME',
            dataIndex: 'idGPT',
            render: idGPT => (
                dataGiaPT.map((item, index) => 
                    item.idGPT === idGPT && item.tenPT
                )
            ),
            align: 'center',
            width: 250
        },
        {
            title: 'NOTE',
            dataIndex: 'ghiChu',
            align: 'center',
            width: 50
        },
        {
            title: 'AMOUNT',
            dataIndex: 'soLuong',
            align: 'center',
            width: 50
        },
        {
            title: 'PRICE',
            dataIndex: 'donGia',
            render: donGia => (
                <>
                    <CurrencyFormat value={donGia} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </>
            ),
            align: 'center',
            width: 100
        },
        {
            title: phanQuyen === 3 ? 'Actions' : '',
            render: (record) => (
                phanQuyen === 3 && (
                    <>
                        <SurchargeUpd onRefesh={onRefesh} idPT={record.idPT} idPTT = {props.idPTT} tpt={totalSurcharge}/>
                        <Popconfirm
                            title="Are you sure?"
                            onConfirm={ () => onDelete(record.idPT) }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip placement="top" title="Delete"><Button className="btn-delete"><RiDeleteBin5Line/></Button></Tooltip>
                        </Popconfirm>
                    </>
                )
            ),
            align: 'center',
            width: 150
        }
    ];

    const columns2 = [
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

    function onDelete(id) {
        const uri = url + urnExtraFeeID(id);
        deleteData(uri)
        .then(res => {
            if (res.data) {
                console.log("res delete: ", res.data);
                var tpt = 0;
                const uri1 = url + urnExtraFeeByIDPTT(props.idPTT);
                getData(uri1)
                .then(res =>{ 
                    // setDataExtraFees(res.data);
                    console.log("loadidPTT:", res.data);
                    res.data.map(item => {
                        tpt += (item.soLuong * item.donGia);
                    });
                    console.log("tpt:", tpt); 
                    console.log("bill.tongtienphong:", bill.tongTienPhong); 
                    var tongTienPhong = bill.tongTienPhong;
                    var tienCoc = tongTienPhong * (30/100);
                    var phiPhatSinh = tpt;
                    console.log("tongTienPhong:", tongTienPhong); 
                    console.log("phiPhatSinh:", phiPhatSinh); 
                    const uri2 = url + urnSaleOffByCost;
                    postData(uri2,{tongTienPhong, phiPhatSinh})
                    .then(resSaleOff => {
                        var phanTramGiam = resSaleOff.data.phanTramGiam;
                        var tongTienConLai = ((tongTienPhong - tienCoc) - (tongTienPhong - tienCoc) * (phanTramGiam / 100)) + (tienCoc - tienCoc * (phanTramGiam / 100)) + (phiPhatSinh - phiPhatSinh * (phanTramGiam / 100));
            
                        var dataPTTP = {
                            tongTienPhong,
                            tienCoc,
                            phiPhatSinh,
                            phanTramGiam,
                            tongTienConLai,
                            idKM: resSaleOff.data.idKM
                        }
                        const uri3 = url + urnBillUpdateMoneyInBill(props.idPTT);
                        putData(uri3, dataPTTP)
                        .then(resUpdBill => {
                            if (resUpdBill.data) {
                                message.success("Delete successfully !", 3).then(()=>{
                                    setIsRefesh(true);
                                    return;
                                })
                            }
                        })
                    })
                });
            }
            else {
                message.error("Something went wrong, please try again!", 3).then(()=>{
                    return;
                })
            }
        })
    }

    const checkToPay = (isDeposit) => {
        setIsLoading(true);
        // Check: Can use rooms on this bill?
        var idPTT = bill.idPTT;
        var idDDP = bill.idDDP;
        var dateA = bill.ngayDen;
        var dateB = bill.ngayDi;
        var arrRoom = [];

        //  Lấy DS Phòng có thể ở vào ngày ấy vs các LP ấy vs số lượng cho từng loại ấy
        //  Để so sánh vs Phía chi tiết Phiếu TT 
        //  Xem xem mình có thễ giữ chân Phòng ấy ko, lỡ có ai nhanh chân giữ chân nó trc lúc mình gom tiền để mình deposit phòng
        let uri = url + urnBookingDetailsByIdBooking(idDDP);
        getData(uri).then((resBookingDetails) => {
            if(typeof resBookingDetails.data === 'undefined'){ 
                setIsLoading(false);
                return message.error("Server Error"); 
            }
            // console.log('booking details by idDDP: ', resBookingDetails.data);
            if(resBookingDetails.data.length > 0){
                var countBD = resBookingDetails.data.length;
                resBookingDetails.data.map((bookingDetail) => {
                    let idLP = bookingDetail.idLP;
                    let soLuong = bookingDetail.soLuong;

                    let data = {
                        dateA,
                        dateB,
                        idLP,
                        soLuong
                    };
                    let uri = url + urnRoomsByDatesIdRoomTypeNumber;
                    postData(uri, data)
                    .then((resRooms) => {
                        countBD--;
                        arrRoom = arrRoom.concat(resRooms.data);

                        if(countBD === 0) {
                            // console.log("Rooms can book: ", arrRoom);
                            
                            // Duyệt các phòng có trong CTPTT để xem có căn nào ko tồn tại trong DS Phòng trống từ DDP vào time hiện tại ko
                            let uri = url + urnBillDetailsByIdBill(idPTT);
                            getData(uri).then((resBillDetails) => {
                                if(typeof resBillDetails.data === 'undefined'){ 
                                    setIsLoading(false);
                                    return message.error("Server Error"); 
                                }
                                if(resBillDetails.data.length > 0) {
                                    var countBillD = resBillDetails.data.length;
                                    resBillDetails.data.map((billDetail) => {
                                        countBillD--;
                                        // console.log('Room in bill detail: ', billDetail);
                                        if(!arrRoom.includes(billDetail.maPhong)) { 
                                            setIsLoading(false);
                                            return notification['warning'](
                                                {
                                                    message: `Can't deposit!`,
                                                    description:
                                                        `Sorry! You can't deposit this bill, because some rooms in this bill had been someone deposit!`,
                                                    duration: 7
                                                }
                                            );
                                        }  
                                        if(countBillD === 0){ 
                                            // console.log('có thể')
                                            setIsLoading(false);
                                            message.success(`You can deposit 30% this bill now!`); 
                                            return isDeposit ? setIsClickDeposit(true) : setIsClickCheckout(true);
                                        }
                                        return 1;
                                    })
                                }
                            })
                        }
                    });
                    return 1;
                })
            }
            
        })
    }

    const onRefesh = (rf) => {
        if(rf === true) {
            setIsRefesh(!isRefesh);
        }
    }

    const onSubmitCancelBill = () => {
        var uri = url + urnBillAdminCancel(bill.idPTT);
        getData(uri).then(resCancel => {
            console.log("kiemtra: ", resCancel.data);
            if (resCancel.data) {
                if (resCancel.data.flag === true) {
                    message.success(resCancel.data.message, 2).then(()=>{
                        setIsRefesh(true);
                        return;
                    });
                }
                else {
                    message.warning(resCancel.data.message, 5).then(()=>{
                        setIsRefesh(true);
                        return;
                    });
                }
            }
            else {
                message.error("Something went wrong, please try again!");
                return;
            }
        })
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
                                <Link to="/admin/bill">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>BILL DETAIL</b></h1>
                        </Col>
                        {
                            phanQuyen === 3 && bill && (bill.tinhTrang === 2 ? (
                                <Col xs={2} md={2} lg={2}>
                                    <SurchargeAdd onRefesh={onRefesh} idPTT = {props.idPTT} tpt={totalSurcharge}/>
                                </Col>
                            ) : (
                                <Col xs={2} md={2} lg={2} />
                            ))
                        }
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
                                                        percent={ bill && (bill.tinhTrang === 1 ? 30 : (bill.tinhTrang === 2 ? 60 : (bill.tinhTrang === 3 ? 100 : 0))) }
                                                        status="active"
                                                        showInfo={false}
                                                    />
                                                </Col>
                                                <Col xs={14} md={10} lg={4} style={{textAlign:'center'}}>
                                                    { bill && (bill.tinhTrang === 1 ? 'Unpaid' : bill.tinhTrang === 2 ? 'Deposited' :  bill.tinhTrang === 3 ? 'Paid' : <span style={{color:'#E3143C', fontWeight: 'bolder'}}>Canceled</span>) } 
                                                </Col>
                                            </Row>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col xs={2} md={2} lg={2}></Col>
                            </Row>
                            <Row style={{ fontFamily: 'Georgia' }}>
                                <Col xs={4} md={4} lg={4}></Col>
                                <Col xs={16} md={16} lg={16}><h1><b>DETAIL OF SURCHARGE</b></h1></Col>
                                <Col xs={4} md={4} lg={4}></Col>
                            </Row>
                            <Row className="mb-30">
                                <Col xs={2} md={2} lg={2} />
                                <Col xs={20} md={20} lg={20}>
                                    <Table 
                                        columns={ columns1 }
                                        dataSource={ dataExtraFees }
                                        pagination={{ pageSize: 5, position: ['topRight', 'none'] }} 
                                        bordered
                                        scroll={{ x: 350 }}
                                        footer={() => 
                                            <>
                                                <Row>
                                                    <Col xs={15} md={15} lg={15} style={{textAlign:'end', fontWeight:'bolder'}}>Total surcharge: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={7} md={7} lg={7}>
                                                        <CurrencyFormat value={totalSurcharge ? totalSurcharge : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                    />
                                </Col>
                                <Col xs={2} md={2} lg={2} />
                            </Row>
                            <Row style={{ fontFamily: 'Georgia' }}>
                                <Col xs={4} md={4} lg={4}></Col>
                                <Col xs={16} md={16} lg={16}><h1><b>DETAIL OF INVOICE</b></h1></Col>
                                <Col xs={4} md={4} lg={4}></Col>
                            </Row>
                            <Row className="mb-30">
                                <Col xs={2} md={2} lg={2} />
                                <Col xs={20} md={20} lg={20}>
                                    <Table 
                                        columns={ columns2 }
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
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total rooms cost: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        <CurrencyFormat value={bill ? bill.tongTienPhong : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Extra fee: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        {/* {
                                                            totalSurcharge ? (
                                                                <CurrencyFormat value={totalSurcharge} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            ) : (
                                                                <CurrencyFormat value={bill ? bill.phiPhatSinh : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            )
                                                        } */}
                                                        <CurrencyFormat value={bill ? bill.phiPhatSinh : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
                                                    <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total amount remaining: </Col>
                                                    <Col xs={2} md={2} lg={2} />
                                                    <Col xs={4} md={4} lg={4}>
                                                        {/* {
                                                            totalSurcharge ? (
                                                                <CurrencyFormat value={bill ? (bill.tongTienConLai + totalSurcharge) : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            ) : (
                                                                <CurrencyFormat value={bill ? bill.tongTienConLai : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                            )
                                                        } */}
                                                        <CurrencyFormat value={bill ? bill.tongTienConLai : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
                                        {
                                            isLoading ? (<>
                                                <Spin size="large" />
                                            </>) : (<>
                                                <Row className="mb-30">
                                                    <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                                                        { 
                                                            bill && (bill.tinhTrang === 1 ? (
                                                                <>
                                                                    <Row>
                                                                        <Col xs={8} md={8} lg={8}>
                                                                        { 
                                                                            isClickDeposit ? (
                                                                                <BtnDeposit bill={bill} onRefesh={onRefesh}/>
                                                                            ) : (
                                                                                <Button className="btn-create" onClick={ () => checkToPay(true) }>DEPOSIT</Button>
                                                                            )
                                                                        }
                                                                        </Col>
                                                                        {/* <Col xs={8} md={8} lg={8}>
                                                                        { 
                                                                            isClickCheckout ? (
                                                                                <BtnCheckout bill={bill} onRefesh={onRefesh}/>
                                                                            ) : (
                                                                                <Button className="btn-create" onClick={ () => checkToPay(false) }>CHECKOUT</Button>
                                                                            ) 
                                                                        }
                                                                        </Col> */}
                                                                        <Col xs={12} md={12} lg={12}>
                                                                            <Popconfirm
                                                                                title="Are you sure to cancel bill"
                                                                                onConfirm={ onSubmitCancelBill }
                                                                                okText="Yes"
                                                                                cancelText="No"
                                                                            >
                                                                                <Button>CANCEL BILL</Button>
                                                                            </Popconfirm>
                                                                        </Col>
                                                                        <Col xs={8} md={8} lg={8}>
                                                                            <Popconfirm
                                                                                title="Are you sure to cancel bill"
                                                                                onConfirm={ onSubmitCancelBill }
                                                                                okText="Yes"
                                                                                cancelText="No"
                                                                            >
                                                                                <Button>CANCEL BILL</Button>
                                                                            </Popconfirm>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            ) : bill.tinhTrang === 2 && (
                                                                <>
                                                                    <Row>
                                                                        <Col xs={12} md={12} lg={12}>
                                                                        { 
                                                                            isClickCheckout ? (
                                                                                <BtnCheckout bill={bill} onRefesh={onRefesh}/>
                                                                            ) : (
                                                                                <Button className="btn-create" onClick={ () => setIsClickCheckout(true) }>CHECKOUT</Button>
                                                                            )
                                                                        }
                                                                        </Col>
                                                                        <Col xs={12} md={12} lg={12}>
                                                                            <Popconfirm
                                                                                title="Are you sure to cancel bill"
                                                                                onConfirm={ onSubmitCancelBill }
                                                                                okText="Yes"
                                                                                cancelText="No"
                                                                            >
                                                                                <Button>CANCEL BILL</Button>
                                                                            </Popconfirm>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            ))
                                                        }

                                                    </Col>
                                                </Row>
                                            </>)
                                        }
                                        
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
