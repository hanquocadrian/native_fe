import React from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar';
import { Row, Col, Table, Button, Tooltip, Popconfirm, message, Image } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GrAdd } from 'react-icons/gr';

import './ServiceImage.css'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Link } from 'react-router-dom';

//Tạm sd http nhưng ko đúng ý nghĩa
import { url } from '../../../../Api/url';
import { getData, deleteData } from 'Api/api';
import { urnServiceImage, urnServiceImageID, urnService } from 'Api/urn';
import { deleteImageFirebase } from 'Helper/ImageFir';
const http = url;

export default function ServiceImage(props) {
    const [dataServiceImages, setdataServiceImages] = useState([]);
    const [service, setService] = useState([]);

    useEffect(() => {
        try {
            const loadServiceImage = async () =>  {
                var url = http + urnServiceImage;
                const result = await axios.get(url)
                .then(res => res.data)
                .catch(err => console.log(err));

                setdataServiceImages(result);
            };
            loadServiceImage();
        } catch (error) {
            console.log('Error => get data Service images: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const getServices = async () =>  {
                var url = http + urnService;
                const result = await axios.get(url)
                .then(res => res.data)
                .catch(err => console.log(err));

                setService(result);
            };
            getServices();
        } catch (error) {
            console.log('Error => get data Service: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idHinhDV',
            align: 'center'
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            render: hinhAnh => (
                <Image src={hinhAnh} alt="not found" style={{ width:"12.5vw", height:"17.5vh"}}/>
            ),
            align: 'center'
        },
        {
            title: 'Service Title',
            dataIndex: 'idDV',
            render: idDV => (
                service.map((item, index) => 
                    item.idDV === idDV && item.tenDV
                )
            ),
            align: 'center'
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/admin/service-image-upd/' + record.idHinhDV }><Button className="btn-edit"><FaRegEdit/></Button></Link>
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={ () => onDelete(record.idHinhDV, record.hinhAnh) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete"><RiDeleteBin5Line/></Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    function onDelete(id, image) {
        deleteImageFirebase(image);
        var uri = http + urnServiceImageID(id);
        deleteData(uri)
        .then(res => {
            message.success("Delete successfully !");

            uri = http + urnServiceImage;
            getData(uri)
            .then(res => setdataServiceImages(res.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <NavbarTop props={props} />
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <div style={{ height: '3vh' }} />
                    <Row>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <Tooltip placement="right" title="Create new one">
                                        <Link to="/admin/service-image-add">
                                            <Button className="btn-add" id="btnAdd">
                                                <GrAdd className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF SERVICE IMAGES</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2} />
                            </Row>
                            <Table 
                                columns={ columns } 
                                dataSource={ dataServiceImages } 
                                pagination={{ pageSize: 3, position: ['topRight', 'none'] }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
