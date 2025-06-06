// IMPORTS
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig.js";

import { hasUserReviewed } from "../utilities.js";
import { getBeerById, getUserById } from "./fetch.js";
import { getBeerIds, getBreweryIds, getCategoryIds, getUserIds } from "./getIds.js";


// POST FUNCTIONS

// BEER
export function postBeer (beer, setLoading, setError) { // beer: the beer object
    if (setLoading) setLoading(true)

    return getBeerIds()
    .then(async (beer_ids) => {
        if (beer_ids.includes(beer.id)) {
            console.log("A beer with that id already exists!")
        } else {
            if (beer && beer.id) {
                try { await setDoc(doc(FIRESTORE_DB, "beers", beer.id), {...beer}) }
                catch(err) { return console.log(err) }
                finally { console.log("beer successfully posted!") }
            }
        }
    })
    .catch((err) => { 
        if (setError) setError(err)
        console.log(err) })
    .finally(() => { if (setLoading) setLoading(false) })
}

// BREWERY
export function postBrewery (brewery, setLoading, setError) { // brewery: the brewery object
    if (setLoading) setLoading(true)

    return getBreweryIds()
    .then(async (brewery_ids) => {
        if (brewery_ids.includes(brewery.id)) {
            console.log("A brewery with that id already exists!")
        } else {
            if (brewery && brewery.id) {
                try { await setDoc(doc(FIRESTORE_DB, "breweries", brewery.id), {...brewery}) }
                catch(err) { return console.log(err) }
                finally { console.log("brewery successfully posted!") }
            }
        }
    })
    .catch((err) => { 
        if (setError) setError(err)
        console.log(err) })
    .finally(() => { if (setLoading) setLoading(false) })
}


// CATEGORY
export function postCategory (category, setLoading, setError) {
    if (setLoading) setLoading(true)

    return getCategoryIds()
    .then(async (category_ids) => {
        if (category_ids.includes(category.id)) {
            console.log("That category already exists!")
        } else {
            if (category && category.id) {
                try { await setDoc(doc(FIRESTORE_DB, "categories", category.id), {...category}) }
                catch(err) { return console.log(err) }
                finally { console.log("category successfully posted!") }
            }
        }
    })
    .catch((err) => { 
        if (setError) setError(err)
        console.log(err) })
    .finally(() => { if (setLoading) setLoading(false) })
}


// USER
export async function postUser (user, setLoading, setError) { // user: the user object
    if (setLoading) setLoading(true)

    return getUserIds()
    .then(async (user_ids) => {
        if (user_ids.includes(user.id)) {
            console.log("A user with that id already exists!")
        } else {
            if (user && user.id) {
                try { await setDoc(doc(FIRESTORE_DB, "users", user.id), {...user}) }
                catch(err) { return console.log(err) }
                finally { console.log("user successfully posted!") }
            }
        }
    })
    .catch((err) => { 
        if (setError) setError(err)
        console.log(err) })
    .finally(() => { if (setLoading) setLoading(false) })
}


// REVIEW
export async function postReview (review, setLoading, setError) { // review: the review object
    if (setLoading) setLoading(true)

    hasUserReviewed(review.user_id, review.beer_id)
    .then((hasReviewed) => {
        if (hasReviewed) { console.log("This user has already reviewed this beer") }
        else {
            let reviewId = review.beer_id+"#"+review.user_id

            return getBeerById(review.beer_id)
            .then(async (beer) => { // update the beer reviews array with the username attached to the new review
                beer.reviews.push(review.user_id)
                try { await setDoc(doc(FIRESTORE_DB, "beers", review.beer_id), {...beer}) }
                catch(err) { return console.log(err) }
                finally { return getUserById(review.user_id) }
            })
            .then(async (user) => { // update the user reviews array with beer_id attached to the new review
                user.reviews.push(review.beer_id)
                try { await setDoc(doc(FIRESTORE_DB, "users", review.user_id), {...user}) }
                catch(err) { return console.log(err) }
                finally { return }
            })
            .then(async () => { // post the new review to the reviews collection
                try { await setDoc(doc(FIRESTORE_DB, "reviews", reviewId), {...review}) }
                catch(err) { return console.log(err) }
                finally { console.log("review successfully posted!") }
            })
            .catch((err) => { console.log(err) })
       }
    })
    .catch((err) => { 
        if (setError) setError(err)
        console.log(err) })
    .finally(() => { if (setLoading) setLoading(false)})
}