import React from 'react'
import Navbar from '../Navigation/Navbar';
import AboutHotel from './AboutHotel/AboutHotel';
import Footer from '../Footer/Footer';
import CarouselQC from '../CarouselQC/CarouselQC';

export default function _About() {
    return (
        <>
            <Navbar />
            <CarouselQC height="72"/>
            <AboutHotel/>
            <Footer/>
        </>
    )
}
