import React from 'react'

import { useEffect, useState} from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import Footer from '../../Common/Footer/Footer';
import BasketInfo from '../../Common/BasketInfo/BasketInfo';

export default function Basket() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div  style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <BasketInfo />
            <Footer />
        </div>
    )
}
