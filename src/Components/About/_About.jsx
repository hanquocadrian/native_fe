import React from 'react'
import Paypal from '../../emu/Paypal/Paypal';

export default function About() {
    return (
        <>
            <p>
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
            </p>
        </>
    )
}
