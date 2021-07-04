import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import IntroCus from 'Components/Common/IntroCus/IntroCus'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import BookingRoomProfile_Detail from 'Components/Common/BookingRoomProfile/BookingRoomProfile_Detail'

export default function PageBookingRoomProfile_Detail(props) {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            {/* <IntroCus intro="Your booking room detail"/> */}
            <div style={{ backgroundColor: 'white', minHeight: '60vh', paddingTop: '30px'}}>
                <BookingRoomProfile_Detail idDDP={props.match.params.id}/>
            </div>
            <Footer />
        </div>
    )
}