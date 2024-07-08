import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { createNewsletter, getNewsletter } from "../../Store/ActionCreators/NewsletterActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Footer() {
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let dispatch = useDispatch()
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData)

  function postData() {
    let item = NewsletterStateData.find((x) => x.email === email)
    if (item)
      setMessage("Your Email Address is Already Registered")
    else {
      dispatch(createNewsletter({ email: email, active: true }))
      setMessage("Thanks to Subscribe Our Newsletter Service")
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getNewsletter())
    })()
  }, [NewsletterStateData.length])
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h1 className="text-white mb-4">
                <i className="fa fa-home text-primary me-3"></i>Ducat
              </h1>
              <p className='text-light'>
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                ipsum et lorem et sit, sed stet lorem sit clita
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-square btn-outline-primary me-1" href="#"
                ><i className="fab fa-twitter"></i
                ></a>
                <a className="btn btn-square btn-outline-primary me-1" href="#"
                ><i className="fab fa-facebook-f"></i
                ></a>
                <a className="btn btn-square btn-outline-primary me-1" href="#"
                ><i className="fab fa-youtube"></i
                ></a>
                <a className="btn btn-square btn-outline-primary me-0" href="#"
                ><i className="fab fa-linkedin-in"></i
                ></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Contact-Us</h4>
              <p className='text-light'><i className="fa fa-map-marker-alt me-3"></i>A-43,Sector 16, Noida</p>
              <p className='text-light'><i className="fa fa-phone-alt me-3"></i><Link to="tel:9873848046" className='text-light'>+919873848046</Link></p>
              <p className='text-light'><i className="fa fa-envelope me-3"></i><Link to="mailto:vishankchauhan@gmail.com" className='text-light'>vishankchauhan@gmail.com</Link></p>
            </div>
            <div className="col-lg-2 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <Link className="text-light btn btn-link" to="/home">Home</Link>
              <Link className="text-light btn btn-link" to="/about">About Us</Link>
              <Link className="text-light btn btn-link" to="/shop">Shop</Link>
              <Link className="text-light btn btn-link" to="/contact">Contact Us</Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-light mb-4">Newsletter</h4>
              <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
              {message ? <p className='text-light'>{message}</p> : ""}
              <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={postData}
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </>
  )
}
