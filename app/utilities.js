// IMPORTS
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseconfig.js";

import { getBeerById, getBreweryById, getCategoryById, getReviewById, getUserById } from "./scripts/fetch.js";



// VALIDATION
export function hasUserVoted (user_id, review_id) { // user_id: the id of the user that is voting for a review | review_id: the review that they are voting for
    let review = {}
    return getReviewById(review_id, (result) => {
            review = result
        }
    ) 
    .then(() => {
        if (review.votes.includes(user_id)) {
            return true
        } return false
    })
}

export function hasUserReviewed (user_id, beer_id) { // user_id: the id of the user posting the review | beer_id: the beer they are posting a review for
    return getBeerById(beer_id)
    .then((beer) => {
        if (beer.reviews.includes(user_id)) return true
        else return false
    })
}

export function isUserFollowing (activeuser_user_id, userToFollow_user_id) { // user_id: the id of the user that wants to follow another user | userToFollow_id: the id of the user they want to follow
    getUserByUsername(aactiveuser_user_id)
    .then((user) => {
        if (user.following.includes(userToFollow_user_id)) return true
        else return false
    })
    return
}
    
export function followUnfollowUser (activeuser_user_id, userToFollow_user_id) {
    return getUserByUsername(activeuser_user_id)
    .then((user) => {
        if (user.following.includes(userToFollow_user_id)) {
            user.following.splice(user.following.indexOf(userToFollow_user_id))
        } else {
            user.following.push(userToFollow_user_id)
        } 
        setDoc(doc(FIRESTORE_DB, "users", activeuser_user_id), {...user})
    })
    .then(() => {
        return getUserByUsername(userToFollow_user_id)
    })
    .then((user) => {
        if (user.followers.includes(activeuser_user_id)) {
            user.followers.splice(user.followers.indexOf(activeuser_user_id))
        } else {
            user.followers.push(activeuser_user_id)
        } 
        setDoc(doc(FIRESTORE_DB, "users", userToFollow_user_id), {...user})
    })
}


// PROFILE
export function isUsernameTaken (usernameString) {
    return getUsernames()
    .then((usernames) => {
        if (usernames.includes(usernameString)) {
            return true
        } return false
    })
}

export function isUsernameValid () {
    return
}

export function isPasswordValid () {
    return
}

export function isEmailValid () {
    return
}



// DATE & TIME
export function getDate (unixTimestamp, type) { // 
    const date = new Date(unixTimestamp * 1000)

    switch (type) {
        case "full":
            return date.toString()
        case "datetime":
            return date.toLocaleString()
        case "date":
            return date.toLocaleDateString()
        case "time":
            return date.toLocaleTimeString()
        case "year":
            return date.getFullYear()
        case "month":
            switch (date.getMonth()) {
                case 1:
                    return "January"
                case 2:
                    return "February"
                case 3:
                    return "March"
                case 4:
                    return "April"
                case 5:
                    return "May"
                case 6:
                    return "June"
                case 7:
                    return "July"
                case 8:
                    return "August"
                case 9:
                    return "September"
                case 10:
                    return "October"
                case 11:
                    return "November"
                case 12:
                    return "December"
            }
        case "day":
            switch (date.getDay()) {
                case 1:
                    return "Monday"
                case 2:
                    return "Tuesday"
                case 3:
                    return "Wednesday"
                case 4:
                    return "Thursday"
                case 5:
                    return "Friday"
                case 6:
                    return "Saturday"
                case 7:
                    return "Sunday"
            }
    }
}