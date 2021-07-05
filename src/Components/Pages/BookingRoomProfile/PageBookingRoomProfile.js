import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import IntroCus from 'Components/Common/IntroCus/IntroCus'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import BookingRoomProfile from 'Components/Common/BookingRoomProfile/BookingRoomProfile'

export default function PageBookingRoomProfile(props) {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <IntroCus intro="Your booking room"/>
            <div style={{ backgroundColor: 'white', minHeight: '60vh', paddingTop: '30px'}}>
                <BookingRoomProfile propsParent={props} />
            </div>
            <Footer />
        </div>
    )
}