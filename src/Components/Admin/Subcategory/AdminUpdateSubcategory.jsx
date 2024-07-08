import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import formValidators from '../../Validators/formValidators'

import { getSubcategory, updateSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminUpdateSubcategory() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState("")
    let [show, setShow] = useState(false)

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    function getInputData(e) {
        let { name, value } = e.target
        if (name === "name")
            setErrorMessage(formValidators(e))
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "true" ? true : false) : value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (errorMessage.length)
            setShow(true)
        else {
            let item = SubcategoryStateData.find((x) => x.name.toLowerCase() === data.name.toLowerCase())
            if (item && item.id !== id) {
                setShow(true)
                setErrorMessage("Subcategory Name is Already Exist")
            }
            else {
                dispatch(updateSubcategory({ ...data }))
                navigate("/admin/subcategory")
            }
        }
    }
    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length) {
                let item = SubcategoryStateData.find((x) => x.id === id)
                if (item) {
                    setData({ ...item })
                }
            }
        })()
    }, [SubcategoryStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Subcategory <Link to="/admin/subcategory"><i className='fa fa-backward text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className='form-control border-primary border-2' placeholder='Subcategory Name' />
                                    {show && errorMessage.length ? <p className='text-danger text-capitalize'>{errorMessage}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active} onChange={getInputData} className='form-select border-primary border-2'>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
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
