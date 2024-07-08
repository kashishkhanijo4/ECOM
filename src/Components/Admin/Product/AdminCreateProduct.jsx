import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import formValidators from '../../Validators/formValidators'
import imageValidators from '../../Validators/imageValidators'

import { createProduct } from '../../../Store/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Store/ActionCreators/BrandActionCreators'
import { useDispatch, useSelector } from 'react-redux'

let rte
export default function AdminCreateProduct() {
    let refdiv = useRef(null);
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        quantity: 0,
        description: "",
        pic: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        color: "Color Field is Mendatory",
        size: "Size Field is Mendatory",
        basePrice: "Base Price Field is Mendatory",
        discount: "Discount Field is Mendatory",
        quantity: "Quantity Field is Mendatory",
        pic: "Pic Field is Mendatory"
    })
    let [show, setShow] = useState(false)

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? Array.from(e.target?.files).map((item) => "/products/" + item.name) : e.target.value
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
                [name]: name === "active" || name==="stock" ? (value === "true" ? true : false) : value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        console.log(errorMessage)
        let error = Object.values(errorMessage).find((x) => x.length > 0)
        if (error)
            setShow(true)
        else {
            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory || MaincategoryStateData[0].name,
                subcategory: data.subcategory || SubcategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: parseInt(data.basePrice),
                discount: parseInt(data.discount),
                finalPrice: parseInt(data.basePrice - data.basePrice * data.discount / 100),
                quantity: parseInt(data.quantity),
                description:rte.getHTMLCode()
            }))
            navigate("/admin/product")
        }
    }
    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])
    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Product <Link to="/admin/product"><i className='fa fa-backward text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} className='form-control border-primary border-2' placeholder='Product Name' />
                                {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>

                            <div className="row">
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-primary border-2'>
                                        {
                                            MaincategoryStateData.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-primary border-2'>
                                        {
                                            SubcategoryStateData.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-primary border-2'>
                                        {
                                            BrandStateData.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} className='form-select border-primary border-2'>
                                        <option value="true">In Stock</option>
                                        <option value="false">Out of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" name="color" onChange={getInputData} className='form-control border-primary border-2' placeholder='Color' />
                                    {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size*</label>
                                    <input type="text" name="size" onChange={getInputData} className='form-control border-primary border-2' placeholder='Size' />
                                    {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData} className='form-control border-primary border-2' placeholder='Base Price' />
                                    {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData} className='form-control border-primary border-2' placeholder='Discount' />
                                    {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <div style={{ height: 400, width: "100%" }} ref={refdiv}></div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className='form-control border-primary border-2' />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="quantity" onChange={getInputData} className='form-control border-primary border-2' placeholder='Stock Quantity' />
                                    {show && errorMessage.quantity ? <p className='text-danger text-capitalize'>{errorMessage.quantity}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select'>
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
