import { Button, Col, message, Row, Input, Select, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { getData, postData, putData } from 'Api/api';
import { url } from 'Api/url';
import { urnSurchargePrice, urnExtraFee, urnSaleOffByCost, urnBillUpdateMoneyInBill, urnExtraFeeByIDPTT, urnBillID, urnRoomByIdBill, urnRoomTypeRateIDLP } from 'Api/urn';
import React, { useState, useEffect } from 'react';

function SurchargeAdd(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const idPTT = props.idPTT;
    const [soLuong, setSoLuong] = useState(0);
    const [donGia, setDonGia] = useState(0);
    const [idGPT, setIdGPT] = useState('');
    const [dataGPT, setDataGPT] = useState([]);
    const [showDataRooms, setShowDataRooms] = useState(false);
    const [dataRooms, setDataRooms] = useState([]);
    const [ghiChu, setGhiChu] = useState('Basic');
    const [bill, setBill] = useState(null);
    
    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => {
            setBill(res.data);
        });
    },[props.idPTT]);

    useEffect(() => {
        var uri = url + urnSurchargePrice;
        getData(uri).then(res =>{ console.log("load:", res.data); setDataGPT(res.data); });
    }, []);

    // useEffect(() => {
    //     dataGPT.map((item, index) => {
    //         if (item.idGPT === idGPT) {
    //             setDonGia(item.giaPT);
    //         }
    //     })
    // }, [idGPT]);

    useEffect(() => {
        if (idGPT) {
            var found = dataGPT.find(item => item.idGPT === idGPT);
            if (found.loaiGPT === 1) {
                setShowDataRooms(false);
                setGhiChu('Basic');
                dataGPT.map((item, index) => {
                    if (item.idGPT === idGPT) {
                        setDonGia(item.giaPT);
                    }
                })
            }
            else {
                setShowDataRooms(true);
                setGhiChu();
                var uri = url + urnRoomByIdBill(idPTT);
                getData(uri)
                .then(res => {
                    setDataRooms(res.data);
                    
                })
            }
        }
    }, [idGPT]);

    useEffect(() => {
        if (ghiChu !== "Basic" && ghiChu) {
            var found = dataRooms.find(item => item.maPhong === ghiChu);
            var uri = url + urnRoomTypeRateIDLP(found.idLP);
            getData(uri)
            .then(res => {
                console.log('gia goc: ', res.data);
                dataGPT.map((item, index) => {
                    if (item.idGPT === idGPT) {
                        console.log('gia 20%: ', res.data * (item.giaPT/100));
                        setDonGia(res.data * (item.giaPT/100));
                    }
                })
            })
        }
    }, [ghiChu]);

    const showModalSearch = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const onReset = () => {
        console.log("setdatagpt: ", dataGPT);
        console.log("idPTT: ", idPTT);
        console.log("idGPT: ", idGPT);
        console.log("donGia: ", donGia);
        console.log("sl: ", soLuong);
        setIdGPT('');
        setSoLuong(0);
        setDonGia(0);
    }

    const onCreate = () => {
        if(idGPT === "" || donGia === 0 || soLuong === 0){
            message.error("Please, fill out all the fields!");
            return;
        }
        const data = {
            soLuong: parseInt(soLuong),
            donGia,
            idGPT,
            idPTT: parseInt(idPTT),
            ghiChu
        }
        console.log(data);
        var uri = url + urnExtraFee;
        postData(uri, data)
        .then(res=>{
            if (res.data) {
                console.log("res add: ", res.data);
                var tpt = 0;
                const uri1 = url + urnExtraFeeByIDPTT(props.idPTT);
                getData(uri1)
                .then(res =>{ 
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
                                message.success("Create successfully, wait a few seconds", 3).then(()=>{
                                    onReset();
                                    return props.onRefesh(true);
                                })
                            }
                        })
                    })
                });
            }
            else {
                message.error("Something went wrong, please try again!", 3).then(()=>{
                    onReset();
                })
            }
        })
    }

    return (
        <>
            <Button onClick={ showModalSearch }>ADD SURCHARGE</Button>
            <Modal 
                title="Create surcharge for customer" 
                visible={ isModalVisible } 
                onCancel={ handleCancel } 
                footer={[
                    <Button onClick={ handleCancel }>
                        Close
                    </Button>
                ]}
            >
                <Row>
                    <Col xs={5} md={5} lg={5}/>
                    <Col xs={15} md={15} lg={15}>
                        <h1><b>CREATE SURCHARGE</b></h1>
                    </Col>
                    <Col xs={4} md={4} lg={4}/>
                </Row>
                <Form>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6}><b>ID Bill:</b></Col>
                        <Col xs={18} md={18} lg={18}>
                            <Input name="idPTT" value={idPTT} readOnly />
                        </Col>
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6}><b>Surcharge name:</b></Col>
                        <Col xs={18} md={18} lg={18}>
                            <Select value={idGPT} style={{width: '100%'}} onChange={value => setIdGPT(value)}>
                                {
                                    dataGPT.map((item, index) => 
                                        <Select.Option key={index} value={item.idGPT}>{item.idGPT + " - " + item.tenPT}</Select.Option>
                                    )
                                }
                            </Select>
                        </Col>
                    </Row>
                    {
                        showDataRooms && (
                            <Row className="mb-15">
                                <Col xs={6} md={6} lg={6}><b>Rooms:</b></Col>
                                <Col xs={18} md={18} lg={18}>
                                    <Select value={ghiChu} style={{width: '100%'}} onChange={value => setGhiChu(value)}>
                                        {
                                            dataRooms.map((item, index) => 
                                                <Select.Option key={index} value={item.maPhong}>{item.maPhong}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </Col>
                            </Row>
                        )
                    }
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6}><b>Price:</b></Col>
                        <Col xs={18} md={18} lg={18}>
                            {/* {
                                dataGPT.map((item, index) => 
                                    item.idGPT === idGPT &&  */}
                                    <Input type="number" prefix="$" suffix="USD" name="donGia" value={donGia} readOnly/>
                                {/* )
                            } */}
                        </Col>
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6}><b>Amount:</b></Col>
                        <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="soLuong" value={soLuong} onChange={ e => setSoLuong(e.target.value) } placeholder="Amount" /></Col>
                    </Row>
                    <Row className="mb-15">
                        <Col xs={6} md={6} lg={6}/>
                        <Col xs={8} md={8} lg={8}>
                            <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                            <Button size="large" onClick={ onCreate } className="btn-create">Create</Button>
                        </Col>
                        <Col xs={4} md={4} lg={4}/>
                    </Row>
                </Form>
            </Modal>  
        </>
    )
}

export default SurchargeAdd

