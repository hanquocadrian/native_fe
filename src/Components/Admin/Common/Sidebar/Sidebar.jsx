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
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const phanQuyen = useSelector(state => state.adminAccountReducer.phanQuyen);    

    return (
        <>
            <Menu theme="light" mode="inline" style={{ width: '21vw', paddingTop: '10px', height: '92vh' }}>
                {
                    //  2: R || 3: G, Search
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/roomtype' >
                                <FaHotel />
                                Room type
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: R
                    phanQuyen === 2 && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/roomtype-image'>
                                <IoIosImages />
                                Room type images
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: R || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/room'>
                                <MdHotel />
                                Room
                            </Link>
                        </Menu.Item>
                    )
                }
                {

                    //  2: R || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/service'>
                                <BiPackage />
                                Service
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: R
                    phanQuyen === 2 && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/service-image'>
                                <IoIosImages />
                                Service images
                            </Link>
                        </Menu.Item>
                    )
                }
                {

                    //  2: R
                    phanQuyen === 2 && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/daily-rate'>
                                <GiPriceTag />
                                Daily Rates 
                            </Link>
                        </Menu.Item>
                    )
                }
                {

                    //  2: R
                    phanQuyen === 2 && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/special-rate'>
                                <GiPriceTag />
                                Special Rates
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: U, G  || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/image-service'>
                                <FaReceipt />
                                Booking
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: U, G  || 3: U, G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/bill'>
                                <FaMoneyBill />
                                Bill
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: G  || 3: Po, Pu, D
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/rrc'>
                                <BiReceipt />
                                Room rental contract
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: G  || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/image-service'>
                                <AiOutlineUserAdd />
                                Customer payment
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: G  || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/image-service'>
                                <AiOutlineUserAdd />
                                Customer booking
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  2: G  || 3: G
                    (phanQuyen === 2 || phanQuyen === 3) && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/customer-stay'>
                                <AiOutlineUsergroupAdd />
                                Customer stay
                            </Link>
                        </Menu.Item>
                    )
                }
                {
                    //  1: R
                    phanQuyen === 1 && (
                        <Menu.Item className="LinkNavAd">
                            <Link to='/admin/adminacc'>
                                <FaUsers />
                                Staff accounts
                            </Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        </>
    )
}
