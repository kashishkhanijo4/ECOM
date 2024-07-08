import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Products from "./Partials/Products"

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Store/ActionCreators/CartActionCreators"
import { createWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { useNavigate, useParams } from 'react-router-dom'
export default function Product() {
    let { id } = useParams()
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let [qty, setQty] = useState(1)

    let navigate = useNavigate()

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)

    function addToCart() {
        let item = CartStateData.find((x) => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                pic: product.pic[0],
                price: product.finalPrice,
                qty: qty,
                total: product.finalPrice * qty,
                stockQuantity: product.quantity
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }
    function addToWishlist() {
        let item = WishlistStateData.find((x) => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                pic: product.pic[0],
                price: product.finalPrice,
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find((x) => x.id === id)
                setProduct(item)
                setRelatedProducts(ProductStateData.filter((x) => x.maincategory === item.maincategory))
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={product.pic && product.pic[0]} style={{ height: 600, width: "100%" }} className="d-block w-100" alt="..." />
                                </div>
                                {
                                    product.pic && product.pic.slice(1).map((item, index) => {
                                        return <div className="carousel-item">
                                            <img src={item} style={{ height: 600, width: "100%" }} className="d-block w-100" alt="..." />
                                        </div>
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>{product.name}</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{product.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>Color/Size</th>
                                    <td>{product.color}/{product.size}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{product.basePrice}</del> &#8377;{product.finalPrice} <sup>{product.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock ? `In Stock/${product.quantity} Quantity Left In Stock` : "Out of Stock"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {
                                            product.stock ?
                                                <>
                                                    <p>
                                                        <button className='btn btn-primary' onClick={() => qty > 1 ? setQty(qty - 1) : ""}><i className='fa fa-minus'></i></button>
                                                        <span className='mx-3'>{qty}</span>
                                                        <button className='btn btn-primary' onClick={() => qty < product.quantity ? setQty(qty + 1) : ""}><i className='fa fa-plus'></i></button>
                                                    </p>
                                                    <div className="btn-group">
                                                        <button className='btn btn-primary' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                                                        <button className='btn btn-secondary text-light' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                                    </div>
                                                </> :
                                                <button className='btn btn-secondary text-light' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <Products title="Related Products" data={relatedProducts.slice(0, 24)} />
            </div>
        </>
    )
}
