import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
    return (
        <div className='my-3 text-center'>
            <h1>Thank You</h1>
            <h2>Your Order Has Been Placed</h2>
            <h3>You Can Track Your Order in Profile Section</h3>
            <Link to="/shop" className='btn btn-primary'>Shop More</Link>
        </div>
    )
}
