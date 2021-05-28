import React from 'react'
import { useEffect } from 'react';
import AboutHotel from '../../Common/AboutHotel/AboutHotel';
import Navbar from '../../Common/Navigation/Navbar';
import CarouselQC from '../../Common/CarouselQC/CarouselQC';
import Footer from '../../Common/Footer/Footer';

export default function _About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <CarouselQC height="72"/>
            <AboutHotel/>
            <Footer/>
        </div>
    )
}
