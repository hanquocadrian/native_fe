import React from 'react'
import { Button, Col, Row, Tooltip, Input, Upload, message, Select, Popconfirm, Switch, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { url } from 'Api/url';
import { urnRoomTypeImageID, urnRoomType } from 'Api/urn';
import { getData, putData } from 'Api/api';
import Form from 'antd/lib/form/Form';
import { AiOutlineUpload } from 'react-icons/ai';
import { Option } from 'antd/lib/mentions';
import { storage } from 'Store/Firebase';

function RoomTypeImageUpd(props) {
    const [roomTypes, setroomTypes] = useState([]);
    const [isChangeImage, setisChangeImage] = useState(false);
    const [isFile, setisFile] = useState(true);
    const [fileHinhAnh, setfileHinhAnh] = useState(null);

    const [idHinhLP, setidHinhLP] = useState(props.idHinhLP);
    const [hinhAnhCu, sethinhAnhCu] = useState("");
    const [hinhAnh, sethinhAnh] = useState("");
    const [idLP, setidLP] = useState("");

    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setroomTypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        var uri = url + urnRoomTypeImageID(idHinhLP);
        getData(uri)
        .then(res => {
            console.log(res.data);
            sethinhAnh(res.data.hinhAnh);
            sethinhAnhCu(res.data.hinhAnh);
            setidLP(res.data.idLP);
        })
        .catch(err => console.log(err));
    }, [])

    function onReset(){
        var uri = url + urnRoomTypeImageID(idHinhLP);
        getData(uri)
        .then(res => {
            sethinhAnh(res.data.hinhAnh);
            sethinhAnhCu(res.data.hinhAnh);
            setidLP(res.data.idLP);

            setisFile(true);
            setisChangeImage(false);
            setfileHinhAnh(null);
        })
        .catch(err => console.log(err));
    }

    const deleteFromFirebase = (url) => {
        try { 
            storage.refFromURL(url).delete().then(() => {
                alert("Picture is deleted successfully!");
                hinhAnhCu("");
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete Picture!");
            console.log(error);
        }
    };

    const onUpdate = () => {
        if(!isChangeImage){
            var data = {
                hinhAnh: hinhAnhCu,
                idLP
            }
            console.log("data: ", data);
            const uri = url + urnRoomTypeImageID(idHinhLP);
            putData(uri, data)
            .then( res => {
                console.log("res upd: ", res);
                message.success("Update data successful, this page will redirect a few moments later", 3).then(()=>{
                    props.propsParent.history.push('/admin/roomtype-image/');
                })
            })
        } else {
            deleteFromFirebase(hinhAnhCu);
            if(fileHinhAnh){
                var ref = 'RoomType';
                var newNameFile = Date.now() + "_" + fileHinhAnh.name;
                var child = newNameFile;

                const uploadTask = storage.ref(ref).child(child).put(fileHinhAnh);
                uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                    storage.ref(ref).child(child).getDownloadURL()
                    .then(uriImage => { 
                        sethinhAnh(uriImage);

                        const data = {
                            hinhAnh: uriImage,
                            idLP
                        };
                        console.log("data: ", data);
                        const uri = url + urnRoomTypeImageID(idHinhLP);
                        putData(uri, data)
                        .then( res => {
                            console.log("res upd: ", res);
                            message.success("Update data successful, this page will redirect a few moments later", 3).then(()=>{
                                props.propsParent.history.push('/admin/roomtype-image/');
                            })
                        })
                    })
                });
            } else {
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
                            <Tooltip placement="right" title="Trở về">
                                <Link to="/admin/roomtype-image/">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CẬP NHẬT HÌNH ẢNH LOẠI PHÒNG</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>ID hình loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="idHinhLP" value={idHinhLP} placeholder="idHinhLP" disabled /></Col>
                        </Row>
                        {
                            !isChangeImage && 
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Hình trước đó:</b></Col>
                                    <Col xs={18} md={18} lg={18}>
                                        <Row justify="center">
                                            <Col xs={24} md={24} lg={24}>
                                                <Image src={ hinhAnhCu } alt="Not found" height={400} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                        }
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Cập nhật hình mới:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Switch checkedChildren="On" unCheckedChildren="Off" onChange={ checked => setisChangeImage(checked) } />
                            </Col>
                        </Row>
                        {
                            isChangeImage == true && 
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>Sử dụng file upload</b></Col>
                                    <Col xs={18} md={18} lg={18}>
                                        <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={ checked => setisFile(checked) } />
                                    </Col>
                                </Row>
                        }
                        {
                            isChangeImage == true && isFile == true ? (
                                <Row className="mb-15">
                                    <Col xs={6} md={6} lg={6}><b>File hình loại phòng:</b></Col>
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
                                    <Col xs={6} md={6} lg={6}><b>URI hình loại phòng:</b></Col>
                                    <Col xs={18} md={18} lg={18}><Input name="hinhAnh" value={hinhAnh} onChange={ e => sethinhAnh(e.target.value) } placeholder="Hình uri cho loại phòng" /></Col>
                                </Row>
                            ) : ( <></> )
                        }
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Select value={ idLP } style={{ width: 225}} onChange={value => setidLP(value)}>
                                    {
                                        roomTypes.map((item, index) => 
                                        <>  
                                            <Option key={index} value={item.idLP}>{item.idLP} - {item.tenLP}</Option>
                                        </>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col xs={2} md={2} lg={2}>
                                <Popconfirm
                                    title="Are you sure to reload form?"
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

export default RoomTypeImageUpd

