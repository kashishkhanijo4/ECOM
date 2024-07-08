import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileTable(props) {
  return (
    <>
        <h5 className='bg-primary text-center text-light p-2'>{props.title}</h5>
        <table className='table table-bordered'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{props.user.name}</td>
                </tr>
                <tr>
                    <th>User Name</th>
                    <td>{props.user.username}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{props.user.email}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{props.user.phone}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{props.user.address}</td>
                </tr>
                <tr>
                    <th>Pin</th>
                    <td>{props.user.pin}</td>
                </tr>
                <tr>
                    <th>City</th>
                    <td>{props.user.city}</td>
                </tr>
                <tr>
                    <th>State</th>
                    <td>{props.user.state}</td>
                </tr>
                <tr>
                    <td colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>
                </tr>
            </tbody>
        </table>
    </>
  )
}
