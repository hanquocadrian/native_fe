import React from 'react'
import NavbarTop from '../../Common/Navigation/NavbarTop';
import { Button, Col, Row, Tooltip } from 'antd';
import Sidebar from '../../Common/Sidebar/Sidebar';
import { GrAdd } from 'react-icons/gr';
import { getData, deleteData } from 'Api/api';
import { url } from 'Api/url';

export default function PageRoomTypeImage() {
    const [dataRoomtypes, setdataRoomtypes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        try {
            var uri = url + '/api/roomtype-image/';

            getData(uri)
            .then(res => setdataRoomtypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log('Error => get data RoomType in Page RoomType: ', error);
        }
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idHinhLP'
        },
        {
            title: 'Thứ hạng',
            dataIndex: 'hinhAnh',
            render: hinhAnh => (
                <Image width={100} height="auto" src={hinhAnh} />
            )
        },
        {
            title: 'Mã LP',
            dataIndex: 'idLP'
        },
        {
            title: 'Action',
            render: (record) => (
                <>
                    <Link to={ '/admin/roomtype-image-detail/' + record.idLP }><Button className="btn-detail">Detail</Button></Link>
                    <Link to={ '/admin/roomtype-image-upd/' + record.idLP }><Button className="btn-edit">Edit</Button></Link>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={ () => onDelete(record.idHinhLP) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    function onDelete(id) {
        var uri = url + '/api/roomtype-image/' + id;
        deleteData(uri)
        .then(res => {
            message.success("Delete this successful !");

            uri = url + '/api/roomtype-image/';
            getData(uri)
            .then(res => setdataRoomtypes(res.data))
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
                                <Tooltip placement="right" title="Thêm Loại Phòng">
                                    <Link to="/admin/roomtype-add">
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
                                dataSource={ dataRoomtypes } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                                scroll={{ x: 1080 }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
