import React, { useEffect } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'

function PageBillDetails(props) {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <div style={{ backgroundColor: 'white', minHeight: '92vh', paddingTop: '30px'}}>

            </div>
            <Footer />
        </div>
    )
}

export default PageBillDetails

