import React, { useEffect, useState } from 'react'

import Sidebar from '../Sidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export default function AdminContactUsShow() {
    let { id } = useParams()
    let [data, setData] = useState({})

    let navigate = useNavigate()

    let ContactUsStateData = useSelector((state) => state.ContactUsStateData)
    let dispatch = useDispatch()


    function deleteData() {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contact")
        }
    }
    function updateData() {
        if (window.confirm("Are You Sure to Change Status : ")) {
            dispatch(updateContactUs({ ...data, active: false }))
            setData((old) => {
                return {
                    ...old,
                    active: false
                }
            })
        }
    }
    useEffect(() => {
        (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                let item = ContactUsStateData.find((x) => x.id === id)
                if (item)
                    setData(item)
            }
        })()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>ContactUs Query</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.active ?
                                                    <button onClick={updateData} className='btn btn-primary w-100'>Update Status</button> :
                                                    <button onClick={deleteData} className='btn btn-danger w-100'>Delete</button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
