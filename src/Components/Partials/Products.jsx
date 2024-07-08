import React from 'react'
import { Link } from 'react-router-dom'

export default function Products(props) {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="g-5 align-items-end mb-5">
                        <div className="wow fadeInUp" data-wow-delay="0.1s">
                            <div className="border-start border-5 border-primary ps-4">
                                {
                                    props.title === "Related Products" ?
                                        <h6 className="text-body text-uppercase mb-2">Other Related Products</h6> :
                                        <>
                                            <h6 className="text-body text-uppercase mb-2">Our Latest Products</h6>
                                            <h3 className="mb-0">for {props.title}</h3>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {
                            props.data && props.data.map((item, index) => {
                                return <div key={index} className="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="service-item bg-light overflow-hidden h-100">
                                        <img className="img-fluid" src={item.pic[0]} style={{ height: 250, width: "100%" }} alt="" />
                                        <div className="service-text position-relative text-center h-100 p-4">
                                            <h5 className="mb-3 fs-5" style={{ height: 50 }}>{item.name}</h5>
                                            <p><del className='text-danger'>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                            <p>{item.quantity} In Stock</p>
                                            <Link to={`/product/${item.id}`} className="btn btn-secondary text-light w-100">Add to Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
