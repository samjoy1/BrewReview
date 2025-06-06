// IMPORTS
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig.js";

// GET DATA
export async function fetchData (collection, id) {
    return new Promise(async function (resolve, reject) {
        const docRef = doc(FIRESTORE_DB, collection, id);
        const docSnap = await getDoc(docRef); 

        resolve(docSnap)
    } )
}

// GET BY ID
export async function getBeerById (beer_id, setFunction) {
    return fetchData("beers", beer_id)
    .then((beer) => { 
        if (setFunction) setFunction(beer.data())
        return beer.data()
    })
    .catch((err) => { return console.log(err) })
}

export async function getBreweryById (brewery_id, setFunction) {
    return fetchData("breweries", brewery_id)
    .then((brewery) => { 
        if (setFunction) setFunction(brewery.data())
        return brewery.data()
    })
    .catch((err) => { return console.log(err) })
}

export async function getCategoryById (category_id, setFunction) {
    return fetchData("categories", category_id)
    .then((category) => { 
        if (setFunction) setFunction(category.data()) 
        return category.data()
    })
    .catch((err) => { return console.log(err) })
}

export async function getReviewById (review_id, setFunction) {
    return fetchData("reviews", review_id)
    .then((review) => { 
        if (setFunction) setFunction(review.data()) 
        return review.data()
    })
    .catch((err) => { return console.log(err) })
}

export async function getUserById (user_id, setFunction) {
    return fetchData("users", user_id)
    .then((user) => { 
        if (setFunction) setFunction(user.data()) 
        return user.data()
    })
    .catch((err) => { return console.log(err) })
}