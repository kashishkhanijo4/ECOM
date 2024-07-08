import React, { useEffect, useState } from 'react'

import Sidebar from '../Sidebar'

import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function AdminCheckoutShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [user, setUser] = useState({})
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    let dispatch = useDispatch()

    function updateData() {
        if (window.confirm("Are You Sure to Update Status : ")) {
            dispatch(updateCheckout({ ...data, orderStatus: orderStatus, paymentStatus: paymentStatus }))
            setData((old) => {
                return {
                    ...old,
                    orderStatus: orderStatus,
                    paymentStatus: paymentStatus
                }
            })
        }
    }
    useEffect(() => {
        (async () => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find((x) => x.id === id)
                setOrderStatus(item.orderStatus)
                setPaymentStatus(item.paymentStatus)
                if (item) {
                    setData(item)
                    let response = await fetch("/user/" + item.user, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    response = await response.json()
                    setUser(response)
                }
            }
        })()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary p-2 text-center text-light'>Checkout</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>
                                            <address>
                                                {user.name}<br />
                                                {user.phone},{user.email}<br />
                                                {user.address}<br />
                                                {user.pin},{user.city},{user.state}<br />
                                            </address>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {
                                                data.orderStatus !== 'Delivered' ?
                                                    <>
                                                        <br />
                                                        <select name='orderStatus' value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select'>
                                                            <option>Order is Placed</option>
                                                            <option>Order is Packed</option>
                                                            <option>Ready to Ship</option>
                                                            <option>Order in Transit</option>
                                                            <option>Out for Delivery</option>
                                                            <option>Delivered</option>
                                                        </select>
                                                    </> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {
                                                data.paymentStatus !== 'Done' ?
                                                    <>
                                                        <br />
                                                        <select name='paymentStatus' value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='form-select'>
                                                            <option>Pending</option>
                                                            <option>Done</option>
                                                        </select>
                                                    </> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                    <button onClick={updateData} className='btn btn-primary w-100'>Update</button> : ""
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h5 className='bg-primary p-2 text-light text-center p-2'>Order Products</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.products?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <a href={item.pic} target="_blank" rel="noreferrer">
                                                        <img src={item.pic} height={50} width={50} alt="" />
                                                    </a>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
