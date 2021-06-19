import { Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import { FaHotel, FaMoneyBill, FaReceipt, FaUsers } from 'react-icons/fa';
import { MdHotel } from 'react-icons/md';
import { IoIosImages } from 'react-icons/io';
import { BiPackage, BiReceipt } from 'react-icons/bi';
import { GiPriceTag } from 'react-icons/gi';
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';

export default function Sidebar() {

    return (
        <>
            <Menu theme="light" mode="inline" style={{ width: '21vw', paddingTop: '10px', height: '92vh' }}>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/roomtype'>
                        <FaHotel />
                        Room type
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/roomtype-image'>
                        <IoIosImages />
                        Room type images
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/room'>
                        <MdHotel />
                        Room
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/service'>
                        <BiPackage />
                        Service
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/service-image'>
                        <IoIosImages />
                        Service images
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/daily-rate'>
                        <GiPriceTag />
                        Daily Rates 
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/special-rate'>
                        <GiPriceTag />
                        Special Rates
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <FaReceipt />
                        Booking
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <FaMoneyBill />
                        Bill
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <BiReceipt />
                        Receipt
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <AiOutlineUserAdd />
                        Customer payment
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <AiOutlineUserAdd />
                        Customer booking
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/image-service'>
                        <AiOutlineUsergroupAdd />
                        Customer
                    </Link>
                </Menu.Item>
                <Menu.Item className="LinkNavAd">
                    <Link to='/admin/adminacc'>
                        <FaUsers />
                        Staff accounts
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    )
}
