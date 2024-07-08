import React, { useState } from 'react'
import formValidators from './Validators/formValidators'

import { createContactUs } from "../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch } from 'react-redux'
export default function Contact() {
    var [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    var [errorMessage, setErrorMessage] = useState({
        name: "Name is Mendatory",
        email: "Email is Mendatory",
        phone: "Phone is Mendatory",
        subject: "Subject is Mendatory",
        message: "Message is Mendatory"
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidators(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x.length > 0)
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, date: new Date(), active: true }))
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
            setMessage("Thanks to Share Your Query With Us, Our Team Will Contact You Soon")
        }
    }
    return (
        <>
            {/* <!-- Contact Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="wow fadeInUp mb-5" data-wow-delay="0.1s">
                        <div className="row g-4 align-items-center">
                            <div className="col-sm-6">
                                <img className="img-fluid" src="/images/banner5.jpg" style={{ height: 330, width: "100%" }} alt="" />
                            </div>
                            <div className="col-sm-6">
                                <h3 className="mb-0">Ducat (A-43,Sector 16 Noida,UP)</h3>
                                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus quae doloribus totam pariatur officia dicta ad eveniet, itaque consequatur perspiciatis iure fugit doloremque sit? Ullam accusantium aperiam reprehenderit dolores esse excepturi natus quaerat ipsum tenetur doloribus, hic beatae exercitationem rem sint deleniti consequuntur officia. Facere quaerat voluptates rem porro et, recusandae officiis quod nemo ab quia esse cupiditate laborum. Iste tempora eos, saepe autem veritatis expedita deserunt accusantium possimus ut perspiciatis. Tempora eum quam nesciunt, magni minima fugiat nemo enim temporibus consequuntur architecto pariatur soluta at corrupti obcaecati, culpa, esse reiciendis dolorum magnam ea! Quos consequuntur dignissimos ullam dolorum non?</p>
                                <div className='d-flex justify-content-between'>
                                    <p className="mb-0"><i className='fa fa-phone'></i> <a href="tel:919873848046">+91-9873848046</a></p>
                                    <p className="mb-0"><i className='fa fa-envelope'></i> <a href="mailto:vishankchauhan@gmail.com">vishankchauhan@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay="0.1s"
                        >
                            <div className="position-relative h-100">
                                <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=a-43,sector16%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe></div></div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="border-start border-5 border-primary ps-4 mb-5">
                                <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
                                <h5 className=" mb-0">If You Have Any Query, Please Contact Us</h5>
                            </div>
                            {message ? <p className='text-success'>{message}</p> : ""}
                            <form onSubmit={postData}>

                                <div className="mb-3">
                                    <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder='Full Name*' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="mb-3">
                                            <input type="email" name="email" onChange={getInputData} value={data.email} className={`form-control border-2 ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} placeholder='Email Address*' />
                                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="mb-3">
                                            <input type="text" name="phone" onChange={getInputData} value={data.phone} className={`form-control border-2 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder='Phone Number*' />
                                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input type="text" name="subject" onChange={getInputData} value={data.subject} className={`form-control border-2 ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} placeholder='Subject*' />
                                    {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : ""}
                                </div>

                                <div className="mb-3">
                                    <textarea name="message" value={data.message} onChange={getInputData} rows={3} className={`form-control border-2 ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} placeholder='Message*' ></textarea>
                                    {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : ""}
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}
        </>
    )
}
