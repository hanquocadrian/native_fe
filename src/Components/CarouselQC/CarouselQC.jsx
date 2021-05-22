import React from 'react'
import { Carousel } from 'antd';
import { http } from '../../link';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CarouselQC(props) {
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
        <>
            { 
                props.height === "92" && 
                    <div style={{ overflow: 'hidden', height: '92vh' }}>
                        <Carousel autoplay>
                            { 
                                slideQuangCao && slideQuangCao.map((item, index) => 
                                    <div key={ index }>
                                        <img src={ item.hinhAnh } alt="not found" style={{ width: "100vw", height: "92vh" }} />
                                    </div>
                                )
                            }
                        </Carousel>   
                    </div>
            }
            { 
                props.height === "72" && 
                    <div style={{ overflow: 'hidden', height: '72vh' }}>
                        <Carousel autoplay>
                            { 
                                slideQuangCao && slideQuangCao.map((item, index) => 
                                    <div key={ index }>
                                        <img src={ item.hinhAnh } alt="not found" style={{ 
                                            display: 'block',
                                            top: '50%', 
                                            position: "relative",
                                            objectFit: "cover",
                                            verticalAlign: 'middle',
                                            width: '100vw',
                                            height: '72vh'
                                        }} />
                                    </div>
                                )
                            }
                        </Carousel>                
                    </div>
            }
        </>
    )
}
