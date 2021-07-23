import { Descriptions } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import React, { useEffect, useState } from 'react';
import {  urnRoomTypeID } from 'Api/urn';
import CurrencyFormat from 'react-currency-format';

export default function ShowRoomtypeName(props) {
    const [tenLP, settenLP] = useState('');
    const CTDDP = props.CTDDP || null;

    useEffect(() => {
        var uri = url + urnRoomTypeID(props.CTDDP.idLP);
        getData(uri)
        .then((res) => {
            settenLP(res.data.tenLP);
        })

    }, [props.CTDDP.idLP]);

    return (
        <>
            <Descriptions
                title={<span style={{ fontFamily: 'Georgia' }}>{tenLP}</span>}
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
                <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px' }} label="id">{props.CTDDP && CTDDP.idCTDDP }</Descriptions.Item>
                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Room type">{tenLP}</Descriptions.Item>
                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Quantity">{props.CTDDP && CTDDP.soLuong}</Descriptions.Item>
                <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Price"><CurrencyFormat value={props.CTDDP && CTDDP.donGia} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Descriptions.Item>
            </Descriptions>
            <br/>
        </>
    )
}