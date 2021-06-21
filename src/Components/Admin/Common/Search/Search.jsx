import { Button, Col, DatePicker, message, Row, Spin, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { postData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomTypeSearchByDates } from 'Api/urn';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './index.css';

const { RangePicker } = DatePicker;

function Search(props) {
    const [isLoading, setisLoading] = useState(false);
    const [roomTypeCanBooking, setroomTypeCanBooking] = useState([]);
    const [dateA, setdateA] = useState('');
    const [dateB, setdateB] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: '#',
            dataIndex: 'idLP',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            },
            align: 'center', 
            width: 200
        },
        {
            title: 'Title',
            dataIndex: 'tenLP',
            align: 'center', 
            width: 200
        },
        {
            title: 'Kinds of room',
            dataIndex: 'hangPhong',
            sorter: {
                compare: (a, b) => a.hangPhong - b.hangPhong
            },
            render: hangPhong => (
                <>
                    <b>{hangPhong}</b> Stars
                </>
            ),
            align: 'center', 
            width: 200
        },
        {
            title: 'Number of rooms',
            dataIndex: 'soLuong',
            align: 'center'
        },
        {
            title: 'Actions',
            align: 'center', 
            render: (record) => (
                <>
                    <Link to={ '/admin/roomtype-detail/' + record.idLP }><Button className="btn-detail">Detail</Button></Link>
                </>
            )
        }
    ]
    
    const showModalSearch = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChooseDate = (date, dateString) => {
        setdateA(dateString[0]);
        setdateB(dateString[1]);
    }

    const onFindRoom = () => {
        setroomTypeCanBooking([]);
        setisLoading(true);
        
        if(dateA == "" || dateB == ""){ 
            setisLoading(false); 
            return message.error("You must choose dates!") 
        }
        const data = {
            dateA,
            dateB
        };
        console.log("data: ", data);
        var uri = url + urnRoomTypeSearchByDates;
        postData(uri, data)
        .then(res => {
            setroomTypeCanBooking(res.data);
            setisLoading(false);
        })
    }
  
    return (
        <>
            <Button onClick={ showModalSearch }>Search</Button>
            <Modal 
                className="admin-model-search-room"
                title="Looking for room type by date" 
                visible={ isModalVisible } 
                onCancel={ handleCancel } 
                footer={[
                    <Button onClick={ handleCancel }>
                        Close
                    </Button>
                ]}
            >
                <Row>
                    <Col xs={4} md={4} lg={4} style={{ lineHeight: '32px' }}>
                        <b>Search by dates:</b> 
                    </Col>
                    <Col xs={18} md={18} lg={18}>
                        <RangePicker onChange={ onChooseDate } />
                    </Col>
                    <Col xs={2} md={2} lg={2}>
                        <Button onClick={ onFindRoom }>Find now</Button>
                    </Col>
                </Row>
                <hr />
                <Row justify="center">
                    <Col>
                        <h1><b>RESULT</b></h1>
                    </Col>
                </Row>
                <Row justify="center">
                    {
                        isLoading ? (
                            <>
                                <div style={{ minHeight: '314px' }}>
                                    <Spin style={{ position: 'relative', top: "100px"}} size="large" />
                                </div>
                            </>
                        ) : (
                            <Table
                                columns={ columns } 
                                dataSource={ roomTypeCanBooking } 
                                pagination={{ pageSize: 3, position: ['bottomRight', 'none'] }} 
                                scroll={{ x: 1080 }}
                            />
                        )
                    }
                </Row>
            </Modal>  
        </>
    )
}

export default Search

