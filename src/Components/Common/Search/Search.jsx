import React, { useState } from 'react';
import { Button, Col, DatePicker, message, Row, Spin, Table } from 'antd';

import { postData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomTypeSearchByDates } from 'Api/urn';
import ButtonSearch from './ButtonSearch/ButtonSearch';

import './Search.css';
import moment from 'moment';
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

function Search(props) {
    const [isLoading, setisLoading] = useState(false);
    const [roomTypeCanBooking, setroomTypeCanBooking] = useState([]);
    const dateA = useSelector(state => state.chooseDatesReducer.dateA);
    const dateB = useSelector(state => state.chooseDatesReducer.dateB);

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
        // {
        //     title: 'Booking quantity',
        //     align: 'center',
        //     render: () => (
        //         <>
        //             <Input style={{ width: '50%' }} type="number" min={0} max={5} name="soLuongDat" value={soLuongDat} onChange={ e => setSoLuongDat(e.target.value) }/>
        //         </>
        //     )
        // },
        {
            title: 'Actions',
            align: 'center', 
            render: (record) => (
                <>
                    {/* <Link to={ '/roomtype/' + record.idLP }><Tooltip placement="top" title={<span>Detail</span>}><Button className="btn-detail"><BiDetail/></Button></Tooltip></Link>
                    <Link to={ '/roomtype/' + record.idLP }><Tooltip placement="top" title={<span>Add to cart</span>}><Button className="btn-detail"><FiShoppingCart/></Button></Tooltip></Link> */}
                    <ButtonSearch idLP={record.idLP} maxSLD={record.soLuong} ngayDen={dateA} ngayDi={dateB}/>
                </>
            )
        }
    ]

    const onFindRoom = () => {
        setroomTypeCanBooking([]);
        setisLoading(true);

        if(dateA === "" || dateB === ""){ 
            setisLoading(false); 
            return message.error("You must choose date!") 
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
            {/* <Button onClick={ showModalSearch }>Search</Button> */}
            {/* <Modal 
                className="admin-model-search-room"
                title="Looking for room type by date" 
                visible={ isModalVisible } 
                onCancel={ handleCancel } 
                footer={[
                    <Button onClick={ handleCancel }>
                        Close
                    </Button>
                ]}
            > */}
                <Row className="mb-15">
                    <Col xs={24} md={5} lg={4} style={{ lineHeight: '32px' }}>
                        <b>Search by date:</b> 
                    </Col>
                    <Col xs={24} md={15} lg={18}>
                        <RangePicker 
                            value={
                                [
                                    moment(new Date(dateA), 'DD/MM/YYYY'), 
                                    moment(new Date(dateB), 'DD/MM/YYYY')
                                ]
                            } 
                            disabled 
                        />
                    </Col>
                    <Col xs={24} md={4} lg={2} style={{ textAlign: 'center' }}>
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
            {/* </Modal>   */}
        </>
    )
}

export default Search