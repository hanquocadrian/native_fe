import React from 'react'
import { Button, Col, Row, Tooltip, Input, Upload, message, Select, Popconfirm, Switch, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { url } from 'Api/url';
import { urnServiceImageID, urnService } from 'Api/urn';
import { getData, putData } from 'Api/api';
import Form from 'antd/lib/form/Form';
import { AiOutlineUpload } from 'react-icons/ai';
import { Option } from 'antd/lib/mentions';
import { storage } from 'Store/Firebase';

export default function ServiceImageUpd(props) {
    const [services, setServices] = useState([]);
    const [isChangeImage, setisChangeImage] = useState(false);
    const [isFile, setisFile] = useState(true);
    const [fileHinhAnh, setfileHinhAnh] = useState(null);

    const [idHinhDV, setidHinhDV] = useState(props.idHinhDV);
    const [hinhAnhCu, sethinhAnhCu] = useState("");
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
    }, [])

    useEffect(() => {
        var uri = url + urnServiceImageID(idHinhDV);
        getData(uri)
        .then(res => {
            console.log(res.data);
            sethinhAnh(res.data.hinhAnh);
            sethinhAnhCu(res.data.hinhAnh);
            setidDV(res.data.idDV);
        })
        .catch(err => console.log(err));
    }, [])

    function onReset(){
        var uri = url + urnServiceImageID(idHinhDV);
        getData(uri)
        .then(res => {
            sethinhAnh(res.data.hinhAnh);
            sethinhAnhCu(res.data.hinhAnh);
            setidDV(res.data.idDV);

            setisFile(true);
            setisChangeImage(false);
            setfileHinhAnh(null);
        })
        .catch(err => console.log(err));
    }

    const deleteFromFirebase = (url) => {
        try { 
            storage.refFromURL(url).delete().then(() => {
                alert("Delete successfully!");
                hinhAnhCu("");
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete this picture!");
            console.log(error);
        }
    }

    const onUpdate = () => {
        if(!isChangeImage){
            var data = {
                hinhAnh: hinhAnhCu,
                idDV
            }
            console.log("data: ", data);
            const uri = url + urnServiceImageID(idHinhDV);
            putData(uri, data)
            .then( res => {
                console.log("res upd: ", res);
                message.success("Update successfully, this page will redirect a few moments later", 3).then(()=>{
                    props.propsParent.history.push('/admin/service-image/');
                })
            })
        } 
        else {
            deleteFromFirebase(hinhAnhCu);
            if(fileHinhAnh){
                var ref = 'Service';
                var newNameFile = Date.now() + "_" + fileHinhAnh.name;
                var child = newNameFile;

                const uploadTask = storage.ref(ref).child(child).put(fileHinhAnh);
                uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                    storage.ref(ref).child(child).getDownloadURL()
                    .then(uriImage => { 
                        sethinhAnh(uriImage);

                        const data = {
                            hinhAnh: uriImage,
                            idDV
                        };
                        console.log("data: ", data);
                        const uri = url + urnServiceImageID(idHinhDV);
                        putData(uri, data)
                        .then( res => {
                            console.log("res upd: ", res);
                            message.success("Update successfully, this page will redirect a few moments later", 3).then(()=>{
                                props.propsParent.history.push('/admin/service-image/');
                            })
                        })
                    })
                });
            } 
            else {
                message.error("Please, input Image!");
                return;
            }
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
                                <Link to="/admin/service-image/">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>UPDATE SERVICE IMAGE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID Service image:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idHinhDV" value={idHinhDV} placeholder="id Service image" disabled /></Col>
                        </Row>
                        {
                            !isChangeImage && 
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Pre Image:</b></Col>
                                    <Col xs={18} md={18} lg={18}>
                                        <Row justify="center">
                                            <Col xs={24} md={24} lg={24}>
                                                <Image src={ hinhAnhCu } alt="Not found" height={400}  />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                        }
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Update new image:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="On" unCheckedChildren="Off" onChange={ checked => setisChangeImage(checked) } />
                            </Col>
                        </Row>
                        {
                            isChangeImage == true && 
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Using file upload</b></Col>
                                    <Col xs={18} md={18} lg={18}>
                                        <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={ checked => setisFile(checked) } />
                                    </Col>
                                </Row>
                        }
                        {
                            isChangeImage == true && isFile == true ? (
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>File Service image:</b></Col>
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
                            ) : ( <></> )
                        }
                        {
                            isChangeImage == true &&  !isFile ?
                             (
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>URI Service image:</b></Col>
                                    <Col xs={18} md={18} lg={18}><Input name="hinhAnh" value={hinhAnh} onChange={ e => sethinhAnh(e.target.value) } placeholder="URI Service image" /></Col>
                                </Row>
                            ) : ( <></> )
                        }
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Service:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={ idDV } style={{ width: 225}} onChange={value => setidDV(value)}>
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
                                <Popconfirm
                                    title="Are you sure?"
                                    onConfirm={ onReset }
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size="large" className="btn-reset">Reset</Button>
                                </Popconfirm>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Button size="large" onClick={ onUpdate } className="btn-edit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
