import { Button, Card, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { http } from '../../../../link';

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
        <div style={{ margin: '30px', width: '300px' }}>
            <Card
                hoverable
                cover={
                    <div style={{width: '300px', height: '230px', overflow: 'hidden'}}>
                        <img alt="not found" src={ image } style={{width: '300px', height: '230px'}} />
                    </div>
                }
            >
                <Meta title={ props.tenLP } description={ props.moTaTD.length > 100 ? props.moTaTD.slice(0,100)+' ...' : props.moTaTD } />
                <div style={{ height: '20px' }} />
                <Row justify="center">
                    <Link to={"/roomtype/" + props.idLP }>
                        <Button >VIEW MORE</Button>
                    </Link>
                </Row>
            </Card>
        </div>
    )
}

ItemSlick.propTypes = {
    idLP: PropTypes.number,
    tenLP: PropTypes.string,
    moTaTD: PropTypes.string,
    image: PropTypes.string
};

export default ItemSlick
