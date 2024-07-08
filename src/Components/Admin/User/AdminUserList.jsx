import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import Sidebar from '../Sidebar'

export default function AdminUserList() {
    let [data, setData] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'username', headerName: 'User Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'role', headerName: 'Role', width: 80 },
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: ({ row }) => <button className="btn btn-danger" onClick={() => deleteData(row.id)}><i className='fa fa-trash'></i></button> },
    ]

    async function deleteData(id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            let response = await fetch("/user/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            await response.json()
            getAPIData()
        }
    }

    async function getAPIData() {
        let response = await fetch("/user", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response.length)
            setData(response)
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>User</h5>
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
