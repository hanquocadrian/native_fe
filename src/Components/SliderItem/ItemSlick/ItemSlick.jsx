import { Button, Card, Row } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { http } from '../../../link';

const { Meta } = Card

function ItemSlick(props) {
    const [image, setImage] = useState("");

    useEffect(() => {
        try {
            const getHinhAnh = async () => {
                var url = http + '/api/imageroomtype/get_by_idlp/' + props.idLP;
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result[0].hinhAnh);
                setImage(result[0].hinhAnh);
            }
            getHinhAnh();
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <>
            <Card
                hoverable
                style={{ width: '35vw', height: 'auto' }}
                cover={<img alt="not found" src={ image } />}
            >
                <Meta title={ props.tenLP } description={ props.moTaTD } />
                <Row>
                    <Button>VIEW</Button>
                </Row>
            </Card>
        </>
    )
}

export default ItemSlick