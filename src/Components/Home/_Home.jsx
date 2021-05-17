import { Carousel } from 'antd';
import React from 'react'
import Navbar from '../Navigation/Navbar';
import { http } from '../../link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Home.css'

export default function Home() {
    const [slideQuangCao, setSlideQuangCao] = useState([]);

    useEffect(() => {
        try {
            const getSlideQuangCao = async () => {
                var url = http + '/api/slider';
                const result = await axios.get(url)
                .then((res) => res.data)
                .catch((err) => console.log(err));

                setSlideQuangCao(result);
            }      

            getSlideQuangCao();      
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <div style={{ overflow: "hidden", height: "92vh" }}>
                <Carousel autoplay>
                    { 
                        slideQuangCao && slideQuangCao.map((item, index) => 
                        <div key={ index }>
                            <img src={ item.hinhAnh } alt="not found" style={{ objectFit: "", width: "100vw", height: "92vh" }} />
                        </div>
                        )
                    }
                </Carousel>                
            </div>
            
        </div>
    )
}
