import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseconfig.js";



// fetch data
export async function fetchData (collection, id) {
    return new Promise(async function (resolve, reject) {
        const docRef = doc(FIRESTORE_DB, collection, id);
        const docSnap = await getDoc(docRef); 

        resolve(docSnap)
    } )
}

// getting only the ids
export async function getBeerIds (setFunction) { // NOTE: setFunction is not required as an input
    const docSnap = await getDocs(collection(FIRESTORE_DB, "beers"));

    let beerIds = []
    try {
        docSnap.forEach((doc) => {
            beerIds.push(doc.data().id)
        })
        if (setFunction) setFunction(beerIds)
        return beerIds
    }
    catch {console.log("Couldn't retrieve that data!")}
    finally {}
}

export async function getUsernames (setFunction) { // NOTE: setFunction is not required as an input
    const docSnap = await getDocs(collection(FIRESTORE_DB, "users"));

    let usernamesArray = []
    try {
        docSnap.forEach((doc) => {
            usernamesArray.push(doc.data().username)
        }) 
        if (setFunction) setFunction(usernamesArray)
        return usernamesArray
    }
    catch {console.log("Couldn't retrieve that data!")}
    finally {}
}

getUsernames()
.then((usernames) => {
    console.log(usernames)
})

getBeerIds()
.then((beers) => {
    console.log(beers)
})



// fetch data by id
export function getBeerById (beer_id, setFunction) {
    return fetchData("beers", beer_id)
    .then((beer) => { 
        if (setFunction) setFunction(beer.data())
        return beer.data()
    })
}

export function getBreweryById (brewery_id, setFunction) {
    return fetchData("breweries", brewery_id)
    .then((brewery) => { 
        if (setFunction) setFunction(brewery.data())
        return brewery.data()
    })
}

export function getCategoryById (category_id, setFunction) {
    return fetchData("categories", category_id)
    .then((category) => { 
        if (setFunction) setFunction(category.data()) 
        return category.data()
    })
}

export function getReviewById (review_id, setFunction) {
    return fetchData("reviews", review_id)
    .then((review) => { 
        if (setFunction) setFunction(review.data()) 
        return review.data()
    })
}

export function getUserByUsername (username, setFunction) {
    return fetchData("users", username)
    .then((user) => { 
        if (setFunction) setFunction(user.data()) 
        return user.data()
    })
}



// validation
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

export function isUserFollowing (activeuser_username, userToFollow_username) { // user_id: the id of the user that wants to follow another user | userToFollow_id: the id of the user they want to follow
    getUserByUsername(activeuser_username)
    .then((user) => {
        if (user.following.includes(userToFollow_username)) return true
        else return false
    })
    return
}
    
export function followUnfollowUser (activeuser_username, userToFollow_username) {
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



// Date & Time
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