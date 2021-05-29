import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { http } from '../../../link';
import ItemService from './ItemService/ItemService';
import { useState, useEffect } from 'react';

export default function SliderService() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        try {
            const getService = async () => {
                var url = http + '/api/service/';
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log(result);
                setServices(result);
            }
            getService();
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
    return (
        <>
            <Slider {...settings}>
                { 
                    services.map((item, index) => 
                        <ItemService 
                            key={index} 
                            idDV = {item.idDV}
                            tenDV  = {item.tenDV}
                            moTaTD = {item.moTaTD}
                            moTaCT = {item.moTaCT}
                        />
                    )
                }
            </Slider>   
        </>
    )
}
