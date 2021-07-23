import React from 'react'
import { Table, Tag } from 'antd';
import { format } from 'date-fns';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function ShowRRC(props) {
    const columns = [
        {
            title: 'id',
            dataIndex: 'idPTP',
            align: 'center'
        },
        {
            title: 'Arrive date',
            dataIndex: 'ngayDen',
            render: ngayDen => (
                <>{ format(new Date(ngayDen), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'End date',
            dataIndex: 'ngayDi',
            render: ngayDi => (
                <>{ format(new Date(ngayDi), 'dd/MM/yyyy') }</>
            ),
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'trangThai',
            render: trangThai => (
                <>
                    {
                        trangThai === 1 ? <Tag icon={<CheckCircleOutlined/>} color="warning">Paid</Tag> : 
                        (
                            trangThai === 2 ? 
                            <Tag icon={<CheckCircleOutlined/>} color="processing">Deposit 30%</Tag> : 
                            <Tag icon={<CheckCircleOutlined spin />} color="success">Completed</Tag>
                        )
                    }
                </>
            ),
            align: 'center'
        },
        {
            title: 'Room',
            dataIndex: 'maPhong',
            align: 'center'
        },
        {
            title: 'Booking id',
            dataIndex: 'idDDP',
            align: 'center'
        }
    ];
    return (
        <>
            <Table 
                columns={ columns } 
                dataSource={ props.RRC } 
                pagination={{ pageSize: 4, position: ['topRight', 'none'] }}
                scroll={{ x: 1080 }}                                                  
            />
        </>
    )
}
