import React, { useEffect, useState } from 'react'
import Footer from 'Components/Common/Footer/Footer'
import NavProfile from 'Components/Common/Navigation/NavProfile/NavProfile'
import BillDetails from 'Components/Common/BillDetails/BillDetails';

function PageBillDetails(props) {
    const [idPTT, setIdPTT] = useState(props.match.params.id);

    useEffect(() => {
        setIdPTT(props.match.params.id);
    },[props.match.params.id])

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return (
        <div style={{ overflow: 'hidden', width: '100vw' }}>
            <NavProfile />
            <div style={{ backgroundColor: 'white', minHeight: '92vh', paddingTop: '30px'}}>
                <BillDetails idPTT={idPTT} propsParent={props} />
            </div>
            <Footer />
        </div>
    )
}

export default PageBillDetails

