import React from 'react'
import { useEffect } from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import Footer from '../../Common/Footer/Footer';
import Rates from 'Components/Common/Rates/Rates';

export default function PageRates(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <Rates propsParent={props}/>
            <Footer/>
        </div>
    )
}