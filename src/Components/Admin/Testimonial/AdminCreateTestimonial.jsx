import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import formValidators from '../../Validators/formValidators'
import imageValidators from '../../Validators/imageValidators'

import { createTestimonial } from '../../../Store/ActionCreators/TestimonialActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminCreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        message: "",
        pic: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        pic: "Pic Field is Mendatory",
        message: "Message Field is Mendatory"
    })
    let [show, setShow] = useState(false)

    let navigate = useNavigate()
    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? "/testimonials/" + e.target.files[0].name : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: e.target.files ? imageValidators(e) : formValidators(e)
                }
            })
        }

        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "true" ? true : false) : value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x.length > 0)
        if (error)
            setShow(true)
        else {
            dispatch(createTestimonial({ ...data }))
            navigate("/admin/testimonial")
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Testimonial <Link to="/admin/testimonial"><i className='fa fa-backward text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} className='form-control border-primary border-2' placeholder='Testimonial Name' />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-primary border-2' />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Message</label>
                                <textarea name="message" onChange={getInputData} placeholder='Message...' className='form-control border-primary border-2' rows={3}></textarea>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-primary border-2'>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Create</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
