import React from 'react'

import { useEffect } from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import Service from '../../Common/Service/Service';
import Footer from '../../Common/Footer/Footer';
import CarouselQC from '../../Common/CarouselQC/CarouselQC';

export default function HotelService() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <CarouselQC height="67"/>
            <Service/>
            <Footer/>
        </>
    )
}
