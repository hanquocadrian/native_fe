import React from 'react'

import axios from 'axios';
import { url } from '../../../Api/url';
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
                var uri = url + '/api/roomtype/';
                const result = await axios.get(uri)
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
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 576,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
              }
          }
        ]
    };

    
    var aos_left = {
        'data-aos': "fade-left",
        'data-aos-offset': "350",
        'data-aos-duration': "750"
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
            <div { ...aos_left }>
                <Slider {...settings} >
                    { 
                        typeof roomTypes !== 'undefined' && roomTypes.map((item, index) => 
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
            </div>
        </>
    )
}
