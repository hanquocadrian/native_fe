import React from 'react'

import { useEffect } from 'react';
import Navbar from '../../Common/Navigation/Navbar';
import Footer from '../../Common/Footer/Footer';
import BasketInfo from '../../Common/BasketInfo/BasketInfo';

export default function Basket() {
    const [slItemAddCart, setslItemAddCart] = useState(localStorage.getItem('slItemsShoppingCart') ? parseInt(localStorage.getItem('slItemsShoppingCart'),10) : 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // const addItemInShoppingCart = (sl) => {
    //     setslItemAddCart(sl);
    // }

    return (
        <div  style={{ overflow: "hidden", width: "100vw" }}>
            <Navbar />
            <BasketInfo />
            <Footer />
        </div>
    )
}
