import React from 'react'

import axios from 'axios';
import { http } from '../../link';
import { Row } from 'antd';
import ItemSlick from './ItemSlick/ItemSlick';
import { useState, useEffect } from 'react';
// import Carousel from 'react-multi-carousel';
// import "react-multi-carousel/lib/styles.css";

export default function SliderItem() {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        try {
            const getRoomType = async () => {
                var url = http + '/api/roomtype/';
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result);
                setRoomTypes(result);
            }
            getRoomType();
        } catch (error) {
            console.log(error);
        }
    },[])

    // const responsive = {
    //     superLargeDesktop: {
    //       // the naming can be any, depends on you.
    //       breakpoint: { max: 4000, min: 3000 },
    //       items: 5
    //     },
    //     desktop: {
    //       breakpoint: { max: 3000, min: 1024 },
    //       items: 3
    //     },
    //     tablet: {
    //       breakpoint: { max: 1024, min: 464 },
    //       items: 2
    //     },
    //     mobile: {
    //       breakpoint: { max: 464, min: 0 },
    //       items: 1
    //     }
    // };

    return (
        <>
            <Row>
                <h1><b>Find your Native room.</b></h1>
            </Row>
            <Row>
                <p style={{fontSize:'15px', marginBottom: '3vh' }}>We all have favourites, and that's ok. From a West End studio to a slick City penthouse, find your perfect pad.</p> 
            </Row>
            <Row>
            {/* <Carousel responsive={responsive}>
                { 
                    roomTypes.map((item, index) => 
                        <ItemSlick 
                            key={index} 
                            idLP = {item.idLP}
                            tenLP  = {item.tenLP}
                            moTaTD = {item.moTaTD}
                            slHienTai = {item.slHienTai}
                        />
                    )
                }                
            </Carousel> */}

            </Row>
        </>
    )
}
