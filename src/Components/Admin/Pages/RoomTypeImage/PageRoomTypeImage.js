import React from 'react'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Button, Col, Image, Row, Tooltip, Popconfirm, message, Table } from 'antd';
import Sidebar from '../../Common/Sidebar/Sidebar';
import { GrAdd } from 'react-icons/gr';
import { getData, deleteData } from 'Api/api';
import { url } from 'Api/url';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urnRoomTypeImage, urnRoomTypeImageID, urnRoomType } from 'Api/urn';
import { storage } from 'Store/Firebase';

export default function PageRoomTypeImage(props) {
    const [dataRoomtypeImages, setdataRoomtypeImages] = useState([]);
    const [dataRoomtype, setdataRoomtype] = useState([]);

    useEffect(() => {
        try {
            var uri = url + urnRoomTypeImage;

            getData(uri)
            .then(res => setdataRoomtypeImages(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setdataRoomtype(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log(error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idHinhLP',
            sorter: {
                compare: (a, b) => a.idHinhLP - b.idHinhLP
            }
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: hinhAnh => (
                <Image style={{ height: '125px', width: 'auto' }} src={hinhAnh} />
            )
        },
        {
            title: 'Mã LP',
            dataIndex: 'idLP',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            }
        },
        {
            title: 'Tên LP',
            dataIndex: 'idLP',
            render: idLP => (
                dataRoomtype.map((item) => 
                    item.idLP === idLP && item.tenLP
                )
            )
        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    <Link to={ '/admin/roomtype-image-upd/' + record.idHinhLP }><Button className="btn-edit">Edit</Button></Link>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={ () => onDelete(record.idHinhLP, record.hinhAnh) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    const deleteFromFirebase = (url) => {
        try { 
            storage.refFromURL(url).delete().then(() => {
                alert("Picture is deleted successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            alert("Can't delete Picture!");
            console.log(error);
        }
    };

    function onDelete(id, image) {
        deleteFromFirebase(image);
        var uri = url + urnRoomTypeImageID(id);
        deleteData(uri)
        .then(res => {
            message.success("Delete this successful !");

            uri = url + urnRoomTypeImage;
            getData(uri)
            .then(res => setdataRoomtypeImages(res.data))
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
                                <Tooltip placement="right" title="Thêm Hình Ảnh Loại Phòng">
                                    <Link to="/admin/roomtype-image-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>DANH SÁCH HÌNH ẢNH LOẠI PHÒNG</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataRoomtypeImages } 
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
