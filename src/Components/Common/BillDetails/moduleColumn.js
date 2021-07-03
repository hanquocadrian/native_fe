import CurrencyFormat from 'react-currency-format'

export const columns = [
    {
        title: 'ROOM',
        dataIndex: 'maPhong',
        align: 'center',
        width: 150
    },
    {
        title: 'AMOUNT',
        dataIndex: 'donGia',
        render: donGia => (
            <>
                <CurrencyFormat value={donGia} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </>
        ),
        align: 'center',
        width: 300
    }
];