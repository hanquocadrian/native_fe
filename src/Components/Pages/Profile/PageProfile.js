import Footer from 'Components/Common/Footer/Footer'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import Profile from 'Components/Common/Profile/Profile'
import React from 'react'

function PageProfile(props) {
    return (
        <div style={{ overflow: 'hidden', width: '98.9vw' }}>
            <NavProfile />
            <Profile propsParent={props} />
            <Footer />
        </div>
    )
}

export default PageProfile

