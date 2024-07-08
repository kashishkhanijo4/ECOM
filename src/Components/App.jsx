import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Partials/Navbar'
import Footer from './Partials/Footer'

import Home from './Home'
import About from './About'
import Contact from './Contact'
import Error from './Error'
import Shop from './Shop'


import AdminHome from './Admin/AdminHome'

import AdminMaincategory from './Admin/Maincategory/AdminMaincategory'
import AdminCreateMaincategory from './Admin/Maincategory/AdminCreateMaincategory'
import AdminUpdateMaincategory from './Admin/Maincategory/AdminUpdateMaincategory'

import AdminSubcategory from './Admin/Subcategory/AdminSubcategory'
import AdminCreateSubcategory from './Admin/Subcategory/AdminCreateSubcategory'
import AdminUpdateSubcategory from './Admin/Subcategory/AdminUpdateSubcategory'

import AdminBrand from './Admin/Brand/AdminBrand'
import AdminCreateBrand from './Admin/Brand/AdminCreateBrand'
import AdminUpdateBrand from './Admin/Brand/AdminUpdateBrand'

import AdminTestimonial from './Admin/Testimonial/AdminTestimonial'
import AdminCreateTestimonial from './Admin/Testimonial/AdminCreateTestimonial'
import AdminUpdateTestimonial from './Admin/Testimonial/AdminUpdateTestimonial'

import AdminProduct from './Admin/Product/AdminProduct'
import AdminCreateProduct from './Admin/Product/AdminCreateProduct'
import AdminUpdateProduct from './Admin/Product/AdminUpdateProduct'
import Product from './Product'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import AdminNewsletter from './Admin/Newsletter/AdminNewsletter'
import AdminUserList from './Admin/User/AdminUserList'
import AdminContactUs from './Admin/ContactUs/AdminContactUs'
import AdminContactUsShow from './Admin/ContactUs/AdminContactUsShow'
import AdminCheckout from './Admin/Checkout/AdminCheckout'
import AdminCheckoutShow from './Admin/Checkout/AdminCheckoutShow'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* Buyer Routes */}
        {
          localStorage.getItem("login") ?
            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/update-profile' element={<UpdateProfile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/confirmation' element={<Confirmation />} />
            </> : ""
        }

        {/* Admin Routes */}
        {
          localStorage.getItem("login") && localStorage.getItem("role") === "Admin" ?
            <>
              <Route path='/admin' element={<AdminHome />} />

              <Route path='/admin/maincategory' element={<AdminMaincategory />} />
              <Route path='/admin/maincategory/create' element={<AdminCreateMaincategory />} />
              <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategory />} />

              <Route path='/admin/subcategory' element={<AdminSubcategory />} />
              <Route path='/admin/subcategory/create' element={<AdminCreateSubcategory />} />
              <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategory />} />

              <Route path='/admin/brand' element={<AdminBrand />} />
              <Route path='/admin/brand/create' element={<AdminCreateBrand />} />
              <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand />} />

              <Route path='/admin/testimonial' element={<AdminTestimonial />} />
              <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial />} />
              <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonial />} />

              <Route path='/admin/product' element={<AdminProduct />} />
              <Route path='/admin/product/create' element={<AdminCreateProduct />} />
              <Route path='/admin/product/update/:id' element={<AdminUpdateProduct />} />

              <Route path='/admin/newsletter' element={<AdminNewsletter />} />

              <Route path='/admin/user' element={<AdminUserList />} />

              <Route path='/admin/contact' element={<AdminContactUs />} />
              <Route path='/admin/contact/show/:id' element={<AdminContactUsShow />} />

              <Route path='/admin/checkout' element={<AdminCheckout />} />
              <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShow />} />
            </> : ""
        }

        <Route path='/*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
