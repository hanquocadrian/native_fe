import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import BookingServiceDetail from 'Components/Common/BookingServiceProfile/Detail/BookingServiceDetail';

function PageBookingServiceDetail(props) {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <div style={{ backgroundColor: 'white', minHeight: '60vh', paddingTop: '30px'}}>
                <BookingServiceDetail propsParent={props} idDDDV={props.match.params.id}/>
            </div>
            <Footer />
        </div>
    )
}

export default PageBookingServiceDetail

