import React from 'react'

import { useState, useEffect } from 'react';
import Navbar from '../Navigation/Navbar';
import RoomDetail from './RoomDetail/RoomDetail';
import Footer from '../Footer/Footer';
import CarouselQC from '../CarouselQC/CarouselQC';

export default function Room(props) {
    const [idLP, setidLP] = useState(props.match.params.id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <CarouselQC height="72"/>
            <RoomDetail idLP={idLP}/>
            <Footer/>
        </>
    )
}
