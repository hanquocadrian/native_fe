import React from 'react'
import { useEffect, useState } from 'react';
import { getData, postData } from 'Api/api';
import { url } from 'Api/url';
import { urnService, urnServiceImage } from 'Api/urn';
import { Button, Col, message, Row, Tooltip, Upload, Input, Select, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import Form from 'antd/lib/form/Form';
import { AiOutlineUpload } from 'react-icons/ai';
import { Option } from 'antd/lib/mentions';
import { postImageFirebase } from 'Helper/ImageFir';

export default function ServiceImageAdd() {
    const [services, setServices] = useState([]);
    const [isFile, setisFile] = useState(true);
    const [fileHinhAnh, setfileHinhAnh] = useState(null);

    const [hinhAnh, sethinhAnh] = useState("");
    const [idDV, setidDV] = useState("");

    useEffect(() => {
        try {
            var uri = url + urnService;

            getData(uri)
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(()=>{
        setidDV(typeof services[0] !== 'undefined' ? services[0].idDV : "");
        console.log('idDV: ', idDV)
    }, [services])

    function onReset() {
        setfileHinhAnh(null);
        sethinhAnh('');
        setidDV(typeof services[0] !== 'undefined' ? services[0].idDV : "");
        setisFile(true);
    }

    const onCreate = () => {
        if(idDV == "")
        {
            message.error("Please, fill out all the fields!");
            return;
        }
        if(isFile){
            if(fileHinhAnh){
                postImageFirebase('Service', fileHinhAnh, (uriImage) => {
                    sethinhAnh(uriImage);

                    const data = {
                        hinhAnh: uriImage,
                        idDV
                    };
                    console.log("data: ", data);
                    const uri = url + urnServiceImage;
                    postData(uri, data)
                    .then( res => {
                        console.log("res add: ", res.data);
                        message.success("Create successfully, wait a few seconds", 3).then(()=>{
                            onReset();
                        })
                    })
                });
            } 
            else {
                message.error("Please, input Image!");
                return;
            }
        } 
        else {
            if(hinhAnh == ""){
                message.error("Please, input Image!");
                return;
            }
            const data = {
                hinhAnh,
                idDV
            };
            console.log("data: ", data);
            const uri = url + urnServiceImage;
            postData(uri, data)
            .then( res => {
                console.log("res add: ", res.data);
                message.success("Create successfully, wait a few seconds", 3).then(()=>{
                    onReset();
                })
            })
        }
    }

    return (
        <>
            <div style={{ height: '3vh' }} />
            <Row>
                <Col xs={2} md={2} lg={2} />
                <Col xs={20} md={20} lg={20}>
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Tooltip placement="right" title="Back">
                                <Link to="/admin/service-image">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE SERVICE IMAGE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Using file upload</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={ checked => setisFile(checked) } />
                            </Col>
                        </Row>
                        {
                            isFile == true ? (
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Service Image File:</b></Col>
                                    <Col xs={18} md={18} lg={18}>
                                        <Upload 
                                            maxCount={1}
                                            beforeUpload={ file => {
                                                const typeImg = ["image/png", "image/jpeg"];
                                                if (!typeImg.includes(file.type)) {
                                                    message.error(`${file.name} is not a png, jpeg file`);
                                                }
                                                return typeImg.includes(file.type) ? true : Upload.LIST_IGNORE;
                                            }}
                                            onChange={ info => {
                                                if(info.fileList[0]){
                                                    console.log('change raw: ', info.fileList[0]);
                                                    console.log('change: ', info.fileList[0].originFileObj);
                                                    setfileHinhAnh(info.fileList[0].originFileObj);
                                                }
                                            }}
                                            onRemove={ () => {
                                                setfileHinhAnh(null);
                                            }}
                                        >
                                            <Button style={{ width: '225px' }} icon={<AiOutlineUpload style={{ fontSize: '20px' }} />}> <span style={{ lineHeight: '25px', fontSize: '15px', position: 'relative', top: '-3px', paddingLeft: '5px' }} >Upload image</span></Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            ) : (
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Service Image URI:</b></Col>
                                    <Col xs={18} md={18} lg={18}><Input name="hinhAnh" value={hinhAnh} onChange={ e => sethinhAnh(e.target.value) } placeholder="Service Image URI" /></Col>
                                </Row>
                            )
                        }
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Service:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={idDV}  style={{ width: 225}} onChange={value => setidDV(value)}>
                                    {
                                        services.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idDV}>{item.idDV} - {item.tenDV}</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onReset } className="btn-reset">Reset</Button>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onCreate } className="btn-create">Create</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs={2} md={2} lg={2} />
            </Row>
        </>
    )
}
