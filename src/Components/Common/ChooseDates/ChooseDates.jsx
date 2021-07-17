import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Input, message, Row } from 'antd';
import { differenceInDays } from 'date-fns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updDates } from 'ReduxConfig/Actions/chooseDates';
import { removeCart } from 'ReduxConfig/Actions/cart';

const { RangePicker } = DatePicker;

function ChooseDates(props) {
    const dispatch = useDispatch();

    const [dateA, setDateA] = useState(useSelector(state => state.chooseDatesReducer.dateA));
    const [dateB, setDateB] = useState(useSelector(state => state.chooseDatesReducer.dateB));
    const [daysDiff, setDaysDiff] = useState(useSelector(state => state.chooseDatesReducer.daysDiff));
    
    useEffect(() => {
        setDaysDiff(differenceInDays(new Date(dateB), new Date(dateA)));
    },[dateA, dateB])

    const onChooseDate = (date, dateString) => {
        setDateA(dateString[0]);
        setDateB(dateString[1]);
    }

    const onAcceptDate = () => {
        var chooseDates = {
            dateA,
            dateB,
        };
        const actionChosenDates = updDates(chooseDates);
        dispatch(actionChosenDates);

        localStorage.setItem('itemsShoppingCart',[]);
        const actionRemoveCart = removeCart();
        dispatch(actionRemoveCart);

        message.success('Choose date successfully!');
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    return (
        <>
            <Row className="mb-30">
                <Col xs={5} md={5} lg={5} style={{ lineHeight: '32px' }}>
                    <b>Search by date:</b> 
                </Col>
                <Col xs={19} md={19} lg={19} style={{ textAlign:'end' }}>
                    <RangePicker defaultValue={[moment(new Date(dateA), 'DD/MM/YYYY'), moment(new Date(dateB), 'DD/MM/YYYY')]} disabledDate={disabledDate} onChange={ onChooseDate } />
                </Col>
            </Row>
            <Row className="mb-30">
                <Col xs={8} md={8} lg={8} style={{ lineHeight: '32px' }}>
                    <b>Night:</b> 
                </Col>
                <Col xs={16} md={16} lg={16} style={{ textAlign:'end' }}>
                    <Input type="number" value={daysDiff} disabled />
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24} style={{ textAlign:'center' }}>
                    <Button onClick={ onAcceptDate }>Choose Dates</Button>
                </Col>
            </Row>
        </>
    )
}

export default ChooseDates

