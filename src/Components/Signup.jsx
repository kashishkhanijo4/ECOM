import React, { useState } from 'react'

import formValidators from './Validators/formValidators'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        username: "Username Field is Mendatory",
        email: "Email Field is Mendatory",
        phone: "Phone Field is Mendatory",
        password: "Password Field is Mendatory"
    })
    let navigate = useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
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
    async function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {

            let error = Object.values(errorMessage).find((x) => x !== "")
            if (!error) {
                let response = await fetch("/user", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                let item = response.find((x) => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            username: item.username === data.username ? "Username Already Taken" : "",
                            email: item.email === data.email ? "Email Address Already Taken" : ""
                        }
                    })
                }
                else {
                    item = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer"
                    }
                    response = await fetch("/user", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(item)
                    })
                    response = await response.json()
                    if (response)
                        navigate("/login")
                    else
                        alert("Something Went Wrong")
                }
            }
            else
                setShow(true)
        }
        else {
            setErrorMessage((old) => {
                return {
                    ...old,
                    password: "Password and Confirm Password Doesn't Matched"
                }
            })
            setShow(true)
        }
    }
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-9 col-11 m-auto">
                        <h5 className='bg-primary p-2 text-light text-center'>Create a Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" className='form-control border-primary border-2' onChange={getInputData} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" className='form-control border-primary border-2' onChange={getInputData} placeholder='UserName' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" className='form-control border-primary border-2' onChange={getInputData} placeholder='Email Address' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="number" name="phone" className='form-control border-primary border-2' onChange={getInputData} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" className='form-control border-primary border-2' onChange={getInputData} placeholder='Password Address' />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" className='form-control border-primary border-2' onChange={getInputData} placeholder='Confirm Password' />
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Signup</button>
                            </div>
                        </form>
                        <Link to="/login">Already Have an Account?Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
