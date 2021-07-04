import React, { useState, useEffect} from 'react'
import { Button, Input, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom'
import { format, differenceInDays } from 'date-fns';

import { url } from '../../../../Api/url';
import { getData } from 'Api/api';
import { urnRoomTypeID, urnRoomTypeImageIDLP, urnRoomTypeRateIDLP } from 'Api/urn';
import { addCart } from 'ReduxConfig/Actions/cart';
import { useDispatch } from 'react-redux';

import { BiDetail } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';

export default function ButtonSearch(props) {
    const [maxSLD, setmaxSLD] = useState(props.maxSLD);
    const [soLuongDat, setSoLuongDat] = useState(0);
    const [idLP, setidLP] = useState(props.idLP);
    const startDate = new Date(props.ngayDen);
    const endDate = new Date(props.ngayDi);

    const dispatch = useDispatch();

    useEffect(() => {
        setidLP(props.idLP);
        setmaxSLD(props.maxSLD);
        setSoLuongDat(0);
    }, [props.idLP, props.maxSLD])

    const onSubmitAddToCart = () => { 
        if(soLuongDat === 0) {
            return message.error("You only book over 0 rooms!!!");
        }
        console.log('combo: ', soLuongDat, idLP);
        var uri = url + urnRoomTypeID(idLP);
        getData(uri)
        .then(LP => {
            if (LP.data) {
                console.log('LP: ', LP.data)
                var uri = url + urnRoomTypeImageIDLP(idLP);
                getData(uri)
                .then(hinhanhLP => {
                    if (hinhanhLP.data) {
                        console.log('Hinh anh LP: ', hinhanhLP.data);
                        var uri = url + urnRoomTypeRateIDLP(idLP);
                        getData(uri)
                        .then(rateLP => {
                            if (rateLP.data) {
                                console.log(rateLP);
                                var date_cart = {
                                    startDate: format(startDate, 'yyyy/MM/dd'),
                                    endDate: format(endDate, 'yyyy/MM/dd'),
                                    days_diff: differenceInDays(endDate, startDate)
                                }
                                console.log('date_cart: ', date_cart);
                                var sl = parseInt(soLuongDat, 10);
                                var obj = {
                                    idLP: LP.data.idLP,
                                    tenLP: LP.data.tenLP,
                                    hangPhong: LP.data.hangPhong,
                                    hinhanhLP: hinhanhLP.data[0].hinhAnh,
                                    giaLP: rateLP.data,
                                    slDat: parseInt(soLuongDat, 10)
                                }
                                console.log('objLP: ', obj);
                                var arrItems = [];
                                var actionSL = null;
                                if (!localStorage.getItem('itemsShoppingCart')) {
                                    localStorage.setItem('dateArriveCart', JSON.stringify(date_cart));
                                    arrItems.push(obj);
                                    localStorage.setItem('itemsShoppingCart', JSON.stringify(arrItems));
                                    // localStorage.setItem('slItemsShoppingCart', JSON.stringify(sl));
                                    actionSL = addCart(sl);
                                    dispatch(actionSL);
                                    message.success("Added to cart successfully!!!");
                                    setSoLuongDat(0);
                                }
                                else {
                                    var test = sl + parseInt(JSON.parse(localStorage.getItem('slItemsShoppingCart')).sl, 10);
                                    if (test <= 5) {
                                        localStorage.setItem('dateArriveCart', JSON.stringify(date_cart));
                                        arrItems = JSON.parse(localStorage.getItem('itemsShoppingCart'));
                                        var found = arrItems.find((object) => object.tenLP === obj.tenLP);
                                        if (found) {
                                            var index = arrItems.findIndex((object) => object.tenLP = obj.tenLP);
                                            obj.slDat += parseInt(arrItems[index].slDat,10);
                                            arrItems[index] = obj;
                                        }
                                        else {
                                            arrItems.push(obj);
                                        }
                                        localStorage.setItem('itemsShoppingCart', JSON.stringify(arrItems));
                                        sl += parseInt(JSON.parse(localStorage.getItem('slItemsShoppingCart')).sl, 10);
                                        console.log('soluong: ', sl);
                                        // localStorage.setItem('slItemsShoppingCart', JSON.stringify(sl));
                                        actionSL = addCart(sl);
                                        dispatch(actionSL);
                                        message.success("Added to cart successfully!!!");
                                        setSoLuongDat(0);
                                    }
                                    else {
                                        message.error("You only book 5 rooms!!!");
                                    }
                                }
                            }
                            else {
                                message.error("Sorry, room does not have price yet!!!");
                            }
                        })
                    }
                    else {
                        message.error("Something went wrong, please try again!!!");
                    }
                })
            }
            else {
                message.error("Something went wrong, please try again!!!");
            }
        })
    }

    return (
        <>
            <Tooltip placement="top" title={<span>Booking quantity</span>}><Input style={{ width: '40%' }} type="number" min={0} max={maxSLD} name="soLuongDat" value={soLuongDat} onChange={ e => setSoLuongDat(e.target.value) }/></Tooltip>
            <Tooltip placement="top" title={<span>Add to cart</span>}><Button onClick={ onSubmitAddToCart } className="btn-detail"><FiShoppingCart/></Button></Tooltip>
            {/* <Tooltip placement="top" title={<span>Add to cart</span>}><Button onClick={ ()=>{ console.log('add to cart: ', soLuongDat, idLP, props.ngayDen, props.ngayDi) } } className="btn-detail"><FiShoppingCart/></Button></Tooltip> */}
            <Link to={ '/roomtype/' + idLP }><Tooltip placement="top" title={<span>Detail</span>}><Button className="btn-detail"><BiDetail/></Button></Tooltip></Link>   
        </>
    )
}