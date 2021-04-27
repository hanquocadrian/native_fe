import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart } from 'Actions';

export default function Home() {
    const cart = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    const roomType = {
        idLP: 1,
        tenLP: "Room rose",
        hinhAnh: "room_rose_01.png",
        giaLP: 1000000
    };
    return (
        <>
            <h3>Hello customer</h3>
            <p>Number room in cart: { cart.count }</p>
            <p>
                <button onClick={() => {
                    dispatch(addCart(roomType))   
                }}>Add room to cart</button>
            </p>
                {
                    cart.count > 0 && <p>This is your Cart:</p> 
                }
            <div>
                {
                    cart.items.map((item, index) => 
                        <p key={ index }>
                            <b>Mã LP: </b><span>{ item.idLP }</span><br />
                            <b>Tên LP: </b><span>{ item.tenLP }</span><br />
                            <b>Hình loại LP: </b><span>{ item.hinhAnh }</span><br />
                            <b>Giá LP: </b><span>{ item.giaLP }</span><br />
                        </p>
                    )
                }
            </div>
        </>
    )
}

