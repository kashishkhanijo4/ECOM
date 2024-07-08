import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
    let [user, setUser] = useState({})
    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            let response = await fetch("/user", {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find((x) => x.id === localStorage.getItem("userid"))
            if (item)
                setUser(item)
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    user.pic ?
                                        <img src={user.pic} height={450} width="100%" alt='User Image' /> :
                                        <img src="/img/noimage.png" height={450} width="100%" alt='User Image' />
                                }
                            </div>
                            <div className="col-md-6">
                                <h5 className='bg-primary text-light text-center p-2'>Admin Profile</h5>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>User Name</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><Link to="/update-profile" className="btn btn-primary w-100">Update Profie</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
