import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import IntroCus from 'Components/Common/IntroCus/IntroCus'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import BookingService from 'Components/Common/BookingServiceProfile/BookingService'

function PageBookingService(props) {    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    
    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <IntroCus intro="Your booking services"/>
            <div style={{ backgroundColor: 'white', minHeight: '60vh', paddingTop: '30px'}}>
                <BookingService propsParent={props} />
            </div>
            <Footer />
        </div>
    )
}

export default PageBookingService

