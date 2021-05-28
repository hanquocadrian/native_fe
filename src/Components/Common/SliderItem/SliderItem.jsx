import React from 'react'

import axios from 'axios';
import { http } from '../../../link';
import { Row } from 'antd';
import ItemSlick from './ItemSlick/ItemSlick';
import { useState, useEffect } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 

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

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
          }
        ]
    };

    return (
        <>
            <Row>
                <h1><b>Find your Native room.</b></h1>
            </Row>
            <Row>
                <p style={{fontSize:'15px', marginBottom: '3vh' }}>We all have favourites, and that's ok. From a West End studio to a slick City penthouse, find your perfect pad.</p> 
            </Row>
            <div style={{ height: '15px' }} />
            <Slider {...settings}>
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
            </Slider>
        </>
    )
}
