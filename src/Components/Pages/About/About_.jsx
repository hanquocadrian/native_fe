import React, { Component } from 'react';
// import Paypal from '../../Common/Paypal/Paypal';
import { useSelector, useDispatch } from 'react-redux';
import { addCart } from 'ReduxConfig/Actions/cart';

function DisplaySL() {
    var sl = useSelector(state => state.cartReducer.sl);
    return (
        <>
            {sl}
        </>
    )
}

function Btn(props) {
    var dispatch = useDispatch();
    return (
        <>
            <button onClick={() => { 
                var actionSL = addCart(1);
                dispatch(actionSL); 
            }}>Inc</button>
        </>
    )
}

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false
        }
    }

    render() {
        return (
            <>
                <p>
                    SL: <DisplaySL /><br />
                    <Btn />
                </p>
                {/* <p>
                    <b>item:</b> Room Rose<br />
                    <b>Price:</b> 5 $<br />
                    <Paypal total={5} />
                </p>
                <p>
                    <b>item:</b> Room Yellow<br />
                    <b>Price:</b> 15 $<br />
                    <Paypal total={15} />
                </p>
                <p>
                    <b>item:</b> Room Kingdom<br />
                    <b>Price:</b> 25 $<br />
                    <Paypal total={25} />
                </p> */}
            </>
        );
    }
}

export default About;
