import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group">
                <NavLink to="/admin" className="list-group-item list-group-item-action mb-1" aria-current="true"><i className='fa fa-home fs-4'></i><span className='float-end'>Home</span></NavLink>
                <NavLink to="/admin/maincategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Maincategory</span></NavLink>
                <NavLink to="/admin/subcategory" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Subcategory</span></NavLink>
                <NavLink to="/admin/brand" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Brand</span></NavLink>
                <NavLink to="/admin/product" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-list fs-4'></i><span className='float-end'>Product</span></NavLink>
                <NavLink to="/admin/testimonial" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-star fs-4'></i><span className='float-end'>Testimonial</span></NavLink>
                <NavLink to="/admin/user" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-users fs-4'></i><span className='float-end'>User</span></NavLink>
                <NavLink to="/admin/newsletter" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-envelope fs-4'></i><span className='float-end'>Newsletter</span></NavLink>
                <NavLink to="/admin/checkout" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-shopping-bag fs-4'></i><span className='float-end'>Checkout</span></NavLink>
                <NavLink to="/admin/contact" className="list-group-item list-group-item-action" aria-current="true"><i className='fa fa-phone fs-4'></i><span className='float-end'>Contact</span></NavLink>
            </div>
        </>
    )
}
