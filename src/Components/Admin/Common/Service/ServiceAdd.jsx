import React from 'react'

export default function ServiceAdd() {
    const [tenDV, settenDV] = useState('');
    const [moTaTD, setmoTaTD] = useState('');
    const [moTaCT, setmoTaCT] = useState('');
    const [hinhThuc, sethinhThuc] = useState(1);
    const [donGia, setdonGia] = useState(0);

    function onReset(){
        settenDV('');
        setmoTaTD('');
        setmoTaCT('')
        sethinhThuc(1);
        setdonGia(0);
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
                                <Link to="/admin/roomtype">
                                    <Button className="btn-close" id="btnAdd">
                                        <ImCancelCircle style={{ color: 'black' }} className="icon-top" />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Col>
                        <Col xs={20} md={20} lg={20}>
                            <h1 className="text-center"><b>CREATE SERVICE</b></h1>
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                    <Form>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Service title:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <Input name="tenDV" value={tenDV} onChange={ e => settenDV(e.target.value) } placeholder="Service title" />
                            </Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Description title:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaTD" value={moTaTD} onChange={ e => setmoTaTD(e.target.value) } placeholder="Description title" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Description detail:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input name="moTaCT" value={moTaCT} onChange={ e => setmoTaCT(e.target.value) } placeholder="Description detail" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Hạng của loại phòng:</b></Col>
                            <Col xs={18} md={18} lg={18}><Rate allowHalf value={hangPhong} onChange={ value => sethangPhong(value) } /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Price:</b></Col>
                            <Col xs={18} md={18} lg={18}><Input type="number" min={1} max={6} name="donGia" value={donGia} onChange={ e => setdonGia(e.target.value) } placeholder="Price" /></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={6}><b>Type:</b></Col>
                            <Col xs={18} md={18} lg={18}>
                                <select onChange={ e => sethinhThuc(e.target.value) } value={hinhThuc}>
                                    <option value={1}>Per booking</option>
                                    <option value={2}>Per person per date</option>
                                    <option value={3}>Free</option>
                                </select>
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
