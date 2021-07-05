import React from 'react'

import { useEffect } from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import Footer from '../../Common/Footer/Footer';
import BookingInfo from '../../Common/BookingInfo/BookingInfo';

export default function Booking() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div  style={{ overflow: "hidden", width: "98.9vw" }}>
            <Navbar />
            <BookingInfo />
            <Footer />
        </div>
    )
}