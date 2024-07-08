import React, { useEffect, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'

import Sidebar from '../Sidebar'

import { getProduct, deleteProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function AdminProduct() {
    let [data, setData] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'maincategory', headerName: 'Maincategory', width: 100 },
        { field: 'subcategory', headerName: 'Subcategory', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 100 },
        { field: 'color', headerName: 'color', width: 70 },
        { field: 'size', headerName: 'Size', width: 50 },
        { field: 'stock', headerName: 'Stock', width: 100,renderCell:({row})=><span>{row.stock?"In Stock":"Out Of Stock"}</span> },
        { field: 'quantity', headerName: 'Quantity', width: 70 },
        { field: 'basePrice', headerName: 'BasePrice', width: 100, renderCell: ({ row }) => <span>&#8377;{row.basePrice}</span> },
        { field: 'discount', headerName: 'Discount', width: 100, renderCell: ({ row }) => <span>{row.discount}% Off</span> },
        { field: 'finalPrice', headerName: 'FinalPrice', width: 100, renderCell: ({ row }) => <span>&#8377;{row.finalPrice}</span> },
        {
            field: 'pic', headerName: 'Pic', width: 300, renderCell: ({ row }) => row.pic?.map((item, index) => {
                return <a key={index} href={`${item}`} target='_blank' rel="noreferrer">
                    <img src={`${item}`} height={50} width={50} className='rounded' alt="" />
                </a>
            })
        },
        { field: 'active', headerName: 'Active', width: 100, renderCell: ({ row }) => <p className={row.active ? "text-success" : "text-danger"}>{row.active ? "Yes" : "No"}</p> },
        { field: 'edit', headerName: 'Edit', width: 100, renderCell: ({ row }) => <Link to={`/admin/product/update/${row.id}`} className="btn btn-primary"><i className='fa fa-edit'></i></Link> },
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: ({ row }) => <button className="btn btn-danger" onClick={() => deleteData(row.id)}><i className='fa fa-trash'></i></button> },
    ]

    let ProductStateData = useSelector((state) => state.ProductStateData)
    let dispatch = useDispatch()


    function deleteData(id) {
        if (window.confirm("Aye You Sure to Delete that Item : ")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length)
            setData(ProductStateData)
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Product <Link to="/admin/product/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
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
