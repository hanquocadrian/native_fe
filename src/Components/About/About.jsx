import React from 'react'
import { useEffect } from 'react';
import AboutHotel from './AboutHotel/AboutHotel';
import Navbar from '../Navigation/Navbar';
import CarouselQC from '../CarouselQC/CarouselQC';
import Footer from '../Footer/Footer';

export default function _About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <CarouselQC height="72"/>
            <AboutHotel/>
            <Footer/>
        </>
    )
}
