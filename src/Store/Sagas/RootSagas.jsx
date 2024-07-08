import { all } from "redux-saga/effects";

import maincategorySagas from "./MaincategorySags"
import subcategorySagas from "./SubcategorySags"
import brandSagas from "./BrandSags"
import productSagas from "./ProductSags"
import testimonialSagas from "./TestimonialSags"
import cartSagas from "./CartSags"
import wishlistSagas from "./WishlistSags"
import checkoutSagas from "./CheckoutSags"
import newsletterSagas from "./NewsletterSags"
import contactUsSagas from "./ContactUsSags"
export default function* RootSagas() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        cartSagas(),
        wishlistSagas(),
        checkoutSagas(),
        newsletterSagas(),
        contactUsSagas(),
    ])
}