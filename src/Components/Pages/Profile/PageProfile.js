import Footer from 'Components/Common/Footer/Footer'
import IntroCus from 'Components/Common/IntroCus/IntroCus'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import Profile from 'Components/Common/Profile/Profile'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function PageProfile(props) {
    const displayName = useSelector(state => state.customerAccountReducer.displayName);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);


    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <IntroCus displayName={ displayName } />
            <div style={{ backgroundColor: 'white', minHeight: '60vh', paddingTop: '30px'}}>
                <Profile propsParent={props} />
            </div>
            <Footer />
        </div>
    )
}

export default PageProfile

