// IMPORTS
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig.js";

// GET IDs
// This is required to check if a document already exists when posting!
export async function getBeerIds (setFunction) { // NOTE: setFunction is not required as an input
    return await getDocs(collection(FIRESTORE_DB, "beers"))
    .then((docSnap) => {
        let beerIds = []
        docSnap.forEach((doc) => {
            beerIds.push(doc.data().id)
        })
        if (setFunction) setFunction(beerIds)
        return beerIds
    })
    .catch((err) => { console.log(err) })
}

export async function getBreweryIds (setFunction) {
    return await getDocs(collection(FIRESTORE_DB, "breweries"))
    .then((docSnap) => {
        let breweryIds = []
        docSnap.forEach((doc) => {
            breweryIds.push(doc.data().id)
        })
        if (setFunction) setFunction(breweryIds)
        return breweryIds
    })
    .catch((err) => { console.log(err) })
}

export async function getCategoryIds (setFunction) {
    return await getDocs(collection(FIRESTORE_DB, "categories"))
    .then((docSnap) => {
        let categoryIds = []
        docSnap.forEach((doc) => {
            categoryIds.push(doc.data().id)
        })
        if (setFunction) setFunction(categoryIds)
        return categoryIds
    })
    .catch((err) => { console.log(err) })
}

export async function getReviewIds (setFunction) {
    return await getDocs(collection(FIRESTORE_DB, "reviews"))
    .then((docSnap) => {
        let reviewIds = []
        docSnap.forEach((doc) => {
            reviewIds.push(doc.data().id)
        })
        if (setFunction) setFunction(reviewIds)
        return reviewIds 
    })
    .catch((err) => { console.log(err) })
}

export async function getUserIds (setFunction) {
    return await getDocs(collection(FIRESTORE_DB, "users"))
    .then((docSnap) => {
        let userIds = []
        docSnap.forEach((doc) => {
            userIds.push(doc.data().id)
        })
        if (setFunction) setFunction(userIds)
        return userIds
    })
    .catch((err) => { console.log(err) })
}

export async function getUsernames (setFunction) { // NOTE: setFunction is not required as an input
    return await getDocs(collection(FIRESTORE_DB, "users"))
    .then((docSnap) => {
        let usernamesArray = []
        docSnap.forEach((doc) => {
            usernamesArray.push(doc.data().username)
        }) 
        if (setFunction) setFunction(usernamesArray)
        return usernamesArray
    })
    .catch((err) => { console.log(err) })
}