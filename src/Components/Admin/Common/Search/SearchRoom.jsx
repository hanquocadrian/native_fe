import { Button, Col, DatePicker, message, Row, Spin, Table, Select, Divider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { postData, getData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomsByDatesIdlp } from 'Api/urn';
import React, { useState } from 'react';
import './index.css';
import { useEffect } from 'react';
import { urnRoomType } from 'Api/urn';

const { RangePicker } = DatePicker;

function SearchRoom(props) {
    const [isLoading, setisLoading] = useState(false);
    const [roomType, setRoomType] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [dateA, setdateA] = useState('');
    const [dateB, setdateB] = useState('');
    const [idLP, setIdLP] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        var uri = url + urnRoomType;
        getData(uri).then(res => setRoomType(res.data));
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'maPhong',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            },
            align: 'center', 
            width: 200
        },
        {
            title: 'Number of guest(s)',
            dataIndex: 'soNguoi',
            align: 'center', 
            width: 200
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
        setRooms([]);
        setisLoading(true);
        
        if(dateA === "" || dateB === "" || idLP === 0){ 
            setisLoading(false); 
            return message.error("You must choose!") 
        }
        const data = {
            dateA,
            dateB,
            idLP
        };
        console.log("data: ", data);
        var uri = url + urnRoomsByDatesIdlp;
        postData(uri, data)
        .then(res => {
            setRooms(res.data)
            setisLoading(false);
        })
    }
  
    return (
        <>
            <Button onClick={ showModalSearch }>Find room can use</Button>
            <Modal 
                className="admin-model-search-rooms"
                title="Looking for room by date and roomtype" 
                visible={ isModalVisible } 
                onCancel={ handleCancel } 
                footer={[
                    <Button onClick={ handleCancel }>
                        Close
                    </Button>
                ]}
            >
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} style={{ lineHeight: '32px' }}>
                        <b>Search by dates:</b> 
                    </Col>
                    <Col xs={14} md={14} lg={14}>
                        <RangePicker onChange={ onChooseDate } />
                    </Col>
                    <Col xs={1} md={1} lg={1} />
                    <Col xs={3} md={3} lg={3}>
                        <Button onClick={ onFindRoom }>Find now</Button>
                    </Col>
                </Row>
                <Row className="mb-15">
                    <Col xs={6} md={6} lg={6} style={{ lineHeight: '32px' }}>
                        <b>Roomtype:</b> 
                    </Col>
                    <Col xs={18} md={18} lg={18}>
                        <Select value={idLP !== 0 ? idLP : ''} style={{ width: 225}} onChange={value => setIdLP(value)}>
                            {
                                roomType.map((item, index) =>
                                    <Select.Option key={index} value={item.idLP}>{item.tenLP}</Select.Option>
                                )
                            }
                        </Select>
                    </Col>
                </Row>
                <Divider />
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
                                dataSource={ rooms } 
                                pagination={{ pageSize: 3, position: ['bottomRight', 'none'] }} 
                            />
                        )
                    }
                </Row>
            </Modal>  
        </>
    )
}

export default SearchRoom

