import React, { useEffect, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid';

import Sidebar from '../Sidebar'

import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function AdminCheckout() {
    let [data, setData] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'user', headerName: 'User', width: 80 },
        { field: 'orderStatus', headerName: 'Order Status', width: 230 },
        { field: 'paymentStatus', headerName: 'Payment Status', width: 130 },
        { field: 'paymentMode', headerName: 'Payment Mode', width: 110 },
        { field: 'subtotal', headerName: 'Subtotal', width: 80, renderCell: ({ row }) => <span>&#8377;{row.subtotal}</span> },
        { field: 'shipping', headerName: 'Shipping', width: 80, renderCell: ({ row }) => <span>&#8377;{row.shipping}</span> },
        { field: 'total', headerName: 'Total', width: 80, renderCell: ({ row }) => <span>&#8377;{row.total}</span> },
        { field: 'date', headerName: 'Date', width: 100, renderCell: ({ row }) => <span>{new Date(row.date).toLocaleDateString()}</span> },
        { field: 'view', headerName: 'View', width: 50, renderCell: ({ row }) => <Link to={`/admin/checkout/show/${row.id}`} className="btn btn-success"><i className='fa fa-eye'></i></Link> },
    ]

    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    let dispatch = useDispatch()

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length)
            setData(CheckoutStateData)
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Checkout</h5>
                        <div className="table-responsive">

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 20, 50, 100]}
                                    checkboxSelection={false}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
