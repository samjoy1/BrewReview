import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseconfig.js";

import { getBeerById, getUserByUsername, hasUserReviewed } from "../utilities.js";

// post
export function postReview (username, beer_id, review) { // username: the username of the user leaving the review | beer_id: the id of the beer the review is for | review: the review object
    hasUserReviewed(username, beer_id)
    .then((hasReviewed) => {
        if (!hasReviewed) {
            let reviewId = beer_id+"#"+username

            return getBeerById(beer_id)
            .then((beer) => { // update the beer reviews array with the username attached to the new review
                beer.reviews.push(username)
                setDoc(doc(FIRESTORE_DB, "beers", beer_id), {...beer})
                return getUserByUsername(username)
            })
            .then((user) => { // update the user reviews array with beer_id attached to the new review
                user.reviews.push(beer_id)
                return setDoc(doc(FIRESTORE_DB, "users", username), {...user})
            })
            .then(() => { // post the new review to the reviews collection
                return setDoc(doc(FIRESTORE_DB, "reviews", reviewId), {...review})
            })   
       }
    }) 
}

const newReview = {
    "id": "heineken_premium#brewcat108",
    "type": "review",
    "title": "What is not to love",
    "body": "Can't go wrong with this product. Perfect taste. Wha is not to love.",
    "beer_id": "heineken_premium",
    "username": "brewcat108",
    "rating": 5,
    "created_at": Date.now(),
    "votes": []
  }

postReview("brewcat108", "heineken_premium", newReview)

export function postBeer () {

}

export function createNewUser () {

}

export function createNewCategory () {

}