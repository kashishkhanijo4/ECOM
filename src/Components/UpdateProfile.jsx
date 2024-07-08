import React, { useEffect, useState } from 'react'

import formValidators from './Validators/formValidators'
import { useNavigate } from 'react-router-dom'
import imageValidators from './Validators/imageValidators'
export default function UpdateProfile() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: "",
        pic: ""
    })
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? "/products/" + e.target.files[0].name : e.target.value
        if (name !== "name" || name === "pic" || name === "phone") {
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
    async function postData(e) {
        e.preventDefault()
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })
        response = await response.json()
        if (response) {
            if (localStorage.getItem("role") === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            alert("Something Went Wrong")
    }

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
                setData({ ...data, ...item })
            else
                navigate("/login")
        })()
    }, [])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-9 col-11 m-auto">
                        <h5 className='bg-primary p-2 text-light text-center'>Update Profile Details</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} className='form-control border-primary border-2' onChange={getInputData} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="number" name="phone" value={data.phone} className='form-control border-primary border-2' onChange={getInputData} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea name="address" value={data.address} onChange={getInputData} className='form-control border-primary border-2' placeholder='Address...'></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="city" value={data.city} className='form-control border-primary border-2' onChange={getInputData} placeholder='City Name' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="state" value={data.state} className='form-control border-primary border-2' onChange={getInputData} placeholder='State Name' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="number" name="pin" value={data.pin} className='form-control border-primary border-2' onChange={getInputData} placeholder='Pin Code' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="file" name="pic" className='form-control border-primary border-2' onChange={getInputData} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
