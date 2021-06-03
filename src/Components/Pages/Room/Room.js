import React from 'react'

import { useState, useEffect } from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import RoomDetail from '../../Common/RoomDetail/RoomDetail';
import Footer from '../../Common/Footer/Footer';
import CarouselQC from '../../Common/CarouselQC/CarouselQC';

export default function Room(props) {
    const [idLP, setidLP] = useState(props.match.params.id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.match.params.id])

    useEffect(()=>{
        setidLP(props.match.params.id);
    },[props.match.params.id])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <CarouselQC height="72"/>
            <RoomDetail idLP={ idLP }/>
            <Footer/>
        </div>
    )
}
