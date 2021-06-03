import { Button, Card, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { url } from '../../../../Api/url';

const { Meta } = Card

function ItemSlick(props) {
    const [image, setImage] = useState("");

    useEffect(() => {
        try {
            const getHinhAnh = async () => {
                var uri = url + '/api/roomtype-image/get_by_idlp/' + props.idLP;
                const result = await axios.get(uri)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log("this: ", typeof result !== 'undefined' ? ( typeof result[0] !== 'undefined'? result[0].hinhAnh : "" ): "" );
                setImage(typeof result !== 'undefined' ? ( typeof result[0] !== 'undefined'? result[0].hinhAnh : "" ): "")
            }
            getHinhAnh();
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <div style={{ margin: '30px', width: '300px', marginLeft: '50px' }}>
            <Card
                hoverable
                cover={
                    <div style={{width: '300px', height: '230px', overflow: 'hidden'}}>
                        <img alt="not found" src={ image } style={{width: '300px', height: '230px'}} />
                    </div>
                }
            >
                <div style={{ height: '143px' }}>
                <Meta title={ props.tenLP } description={ props.moTaTD.length > 100 ? props.moTaTD.slice(0,100)+' ...' : props.moTaTD } />
                    <div style={{ height: '20px' }} />
                    <Row justify="center">
                        <Link to={"/roomtype/" + props.idLP }>
                            <Button >VIEW MORE</Button>
                        </Link>
                    </Row>                
                </div>
 
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
