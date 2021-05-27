import React from 'react'

import { useEffect } from 'react';
import Navbar from '../Navigation/Navbar';
import Service from './Service/Service';
import Footer from '../Footer/Footer';
import CarouselQC from '../CarouselQC/CarouselQC';

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
