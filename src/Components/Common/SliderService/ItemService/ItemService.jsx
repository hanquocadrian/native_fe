import { Button, Card, Row, Modal } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { http } from '../../../../link';
import ShowServiceDetail from './showServiceDetail';

const { Meta } = Card

function ItemService(props) {
    const [image, setImage] = useState("");
    const [hinhAnhDV, setHinhAnhDV] = useState([]);
    const [visible, setVisible] = useState(false);
    const [dv, setDV] = useState([]);

    useEffect(() => {
        try {
            const getHinhAnh = async () => {
                var url = http + '/api/imageservice/get_by_iddv/' + props.idDV;
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result[0].hinhAnh);
                setImage(result[0].hinhAnh);
                // setHinhAnhDV(result);
                // console.log('hinh Anh dv:',hinhAnhDV);
            }
            getHinhAnh();
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        try {
            const getServiceByID = async () => {
                var url = http + '/api/service/' + props.idDV;
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result);
                setDV(result);
            }
            getServiceByID();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            const getHinhAnhDV = async () => {
                var url = http + '/api/imageservice/get_by_iddv/' + props.idDV;
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                setHinhAnhDV(result);
                console.log('hinh Anh dv:',hinhAnhDV);
            }
            getHinhAnhDV();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const x = visible;

    return (
        <div style={{ margin: '30px', width: '300px' }}>
            <Card
                hoverable
                cover={
                    <div style={{ width: '300px', height: '250px', overflow: 'hidden' }}>
                        <img alt="not found" src={ image } style={{width:'300px', height:'250px'}} />
                    </div>
                }
            >
                <Meta title={ props.tenDV } description={ props.moTaTD.length > 30 ? props.moTaTD.slice(0,30)+' ...' : props.moTaTD } />
                <div style={{ height:'20px' }} />
                <Row>
                    <Button style={{border:'1px solid', borderColor:'#322B26', color:'#322B26'}} onClick={() => setVisible(true)}>{ x ? 'CLOSE' : 'DETAIL' }</Button>
                </Row>
                {
                    x && 
                    <Modal
                        title={<b style={{fontSize:'20px'}}>{dv.tenDV}</b>}
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                    >
                        <ShowServiceDetail
                            idDV = {dv.idDV}
                            tenDV  = {dv.tenDV}
                            donGia = {dv.donGia}
                            hinhThuc = {dv.hinhThuc}
                            moTaTD = {dv.moTaTD}
                            moTaCT = {dv.moTaCT}
                            hinhAnhDV = {hinhAnhDV}
                        />
                    </Modal>
                }
            </Card>
        </div>
    )
}

export default ItemService