import { Button, Card, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
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
        <div style={{ margin: '30px', width: '21vw' }}>
            <Card
                hoverable
                cover={
                    <div style={{width: '21vw', height: '30vh', overflow: 'hidden'}}>
                        <img alt="not found" src={ image } style={{width: '21vw', height: '30vh'}} />
                    </div>
                }
            >
                <Meta title={ props.tenLP } description={ props.moTaTD.length > 100 ? props.moTaTD.slice(0,100)+' ...' : props.moTaTD } />
                <div style={{ height: '20px' }} />
                <Row>
                    <Button>VIEW MORE</Button>
                </Row>
            </Card>
        </div>
    )
}

ItemSlick.propTypes = {
    tenLP: PropTypes.string,
    moTaTD: PropTypes.string,
    image: PropTypes.string
};

export default ItemSlick
