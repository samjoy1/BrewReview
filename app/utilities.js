import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseconfig.js";



// fetch data
async function fetchData (collection, id) {
    return new Promise(async function (resolve, reject) {
        const docRef = doc(FIRESTORE_DB, collection, id);
        const docSnap = await getDoc(docRef); 

        resolve(docSnap)
    } )
}

async function getUsernames () {
    const docSnap = await getDocs(collection(FIRESTORE_DB, "users"));

    let usernamesArray = []
    try {
        docSnap.forEach((doc) => {
            usernamesArray.push(doc.data().username)
        }) 
        return usernamesArray
    }
    catch {}
    finally {}
}



// fetch data by id
function getBeerById (beer_id, setFunction) {
    return fetchData("beers", beer_id)
    .then((beer) => { 
        if (setFunction) setFunction(beer.data())
        return beer.data()
    })
}

function getBreweryById (brewery_id, setFunction) {
    return fetchData("breweries", brewery_id)
    .then((brewery) => { 
        if (setFunction) setFunction(brewery.data())
        return brewery.data()
    })
}

function getCategoryById (category_id, setFunction) {
    return fetchData("categories", category_id)
    .then((category) => { 
        if (setFunction) setFunction(category.data()) 
        return category.data()
    })
}

function getReviewById (review_id, setFunction) {
    return fetchData("reviews", review_id)
    .then((review) => { 
        if (setFunction) setFunction(review.data()) 
        return review.data()
    })
}

function getUserByUsername (username, setFunction) {
    return fetchData("users", username)
    .then((user) => { 
        if (setFunction) setFunction(user.data()) 
        return user.data()
    })
}



// validation
function hasUserVoted (user_id, review_id) { // user_id: the id of the user that is voting for a review | review_id: the review that they are voting for
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

function hasUserReviewed (user_id, beer_id) { // user_id: the id of the user posting the review | beer_id: the beer they are posting a review for
    return getBeerById(beer_id)
    .then((beer) => {
        if (beer.reviews.includes(user_id)) return true
        else return false
    })
}

function isUserFollowing (activeuser_username, userToFollow_username) { // user_id: the id of the user that wants to follow another user | userToFollow_id: the id of the user they want to follow
    getUserByUsername(activeuser_username)
    .then((user) => {
        if (user.following.includes(userToFollow_username)) return true
        else return false
    })
    return
}
    
function followUnfollowUser (activeuser_username, userToFollow_username) {
    return getUserByUsername(activeuser_username)
    .then((user) => {
        if (user.following.includes(userToFollow_username)) {
            user.following.splice(user.following.indexOf(userToFollow_username))
        } else {
            user.following.push(userToFollow_username)
        } 
        setDoc(doc(FIRESTORE_DB, "users", activeuser_username), {...user})
    })
    .then(() => {
        return getUserByUsername(userToFollow_username)
    })
    .then((user) => {
        if (user.followers.includes(activeuser_username)) {
            user.followers.splice(user.followers.indexOf(activeuser_username))
        } else {
            user.followers.push(activeuser_username)
        } 
        setDoc(doc(FIRESTORE_DB, "users", userToFollow_username), {...user})
    })
}


// Profile
function isUsernameTaken (usernameString) {
    return getUsernames()
    .then((usernames) => {
        if (usernames.includes(usernameString)) {
            return true
        } return false
    })
}


function isPasswordValid () {
    return
}

function isEmailValid () {
    return
}


// module.exports = { 
//     getBeerById, getBreweryById, getCategoryById, getReviewById, getUserByUsername,
//     hasUserVoted, hasUserReviewed, isUserFollowing,
//     isUsernameTaken, isPasswordValid, isEmailValid
//  }