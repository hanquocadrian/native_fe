import { Col, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function IntroCus(props) {
    const idTK = useSelector(state => state.customerAccountReducer.idTK);
    const displayName = useSelector(state => state.customerAccountReducer.displayName);

    return (
        <>
            <img 
                src="https://firebasestorage.googleapis.com/v0/b/fir-nativecity.appspot.com/o/slide%2FIMG_08.jpg?alt=media&token=ba97dcc9-3619-4044-8ad9-c54cce6cedcc" 
                style={{ position: 'fixed', zIndex: '-1', width: '100vw', height: '92vh', filter: 'brightness(50%)' }} 
            />
            <div style={{ height: '92vh' }} />
            <Row style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '98.9vw'}}>
                <Col xs={6} md={6} lg={6} />
                <Col xs={12} md={12} lg={12}>
                    <p className="text-center">
                        <Link to={"/user/profile/" + idTK} className="animation-star">
                            <span className="user-name" style={{ color: 'white', fontSize: '65px' }}>✨ { displayName || 'Dear Customer'} ✨</span>
                        </Link>
                        <hr style={{ color: 'white'}} />
                        <span style={{ color: 'white', fontSize: '20px' }}>{props.intro}</span>
                    </p>
                </Col>
                <Col xs={6} md={6} lg={6} />
            </Row>  
        </>
    )
}

IntroCus.propTypes = {
    displayName: PropTypes.string.isRequired,
    intro: PropTypes.string,
}

IntroCus.defaultProps = {
    intro: 'Your Profile'
}

export default IntroCus

