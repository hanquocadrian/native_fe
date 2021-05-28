import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addCart } from 'Store/Actions';

export default function Home() {
    const cart = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        try {
            const fetchGetSlider = async () => {    
                var url = "https://nativecity.herokuapp.com/api/slider/";
                const result = await axios.get(url)
                .then((res) =>{
                    return res.data;
                })
                .catch((err) => console.log(err));
                setSliders(result);
            }
            fetchGetSlider();              
        } catch (error) {
            console.log("Error: ", error)
        }
    },[]);

    const roomType = {
        idLP: 1,
        tenLP: "Room rose",
        hinhAnh: "room_rose_01.png",
        giaLP: 1000000
    };

    return (
        <>
            <h1>Hello customer</h1>
            <div>
                <h3>Slider API</h3>
                <div>
                    {
                        sliders.map((item, index) => 
                            <p key={ index }>
                                <b>Mã Slider: </b><span>{ item.idSlide }</span><br />
                                <img width="200" src={ item.hinhAnh } alt="Hình" /><br />
                            </p>
                        )
                    }
                </div>                
            </div>
            <div>
                <h3>
                    Number room in cart: { cart.count }
                </h3>
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
            </div>
        </>
    )
}

