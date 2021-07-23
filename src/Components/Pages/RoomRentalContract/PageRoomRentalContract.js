import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import IntroCus from 'Components/Common/IntroCus/IntroCus'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import RoomRentalContract from 'Components/Common/RoomRentalContract/RoomRentalContract'

export default function PageRoomRentalContract(props) {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <IntroCus intro="Room Rental Contract" />
            <div style={{ backgroundColor: 'white', minHeight: '92vh', paddingTop: '30px'}}>
                <RoomRentalContract propsParent={props} />
            </div>
            <Footer />
        </div>
    )
}